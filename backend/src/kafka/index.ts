import type {HandlerMessage} from "./types";
import type { Message,ConsumerConfig, Consumer } from "kafkajs";
import HandlerError from "../error";
import kafka from "./kafka";


interface ICustomKafka {
    consumers: Array<Consumer>;
}
  
class CustomKafka implements ICustomKafka {

    public consumers: Array<Consumer> = [];


    async send(topic: string, message: Message) {
        if (!topic || !message) {
            throw HandlerError.badRequest("[Kafka send]", "Invalid arguments");
        }
    
        const producer = kafka.producer();
        try {
            await producer.connect();
            
            // Добавляем таймаут для инициализации
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const result = await producer.send({
                topic: topic,
                messages: [{
                    ...message,
                    value: message.value,
                }],
            });
            
            return result;
        } catch (error) {
            console.error(`Failed to send message to ${topic}:`, error);
            throw HandlerError.internal("[Kafka send]", `Failed to send: ${(error as Error).message}`);
        } finally {
            setTimeout(async () => {
                await producer.disconnect().catch(e => console.error("Producer disconnect error:", e));
            }, 500); // Задержка перед закрытием
        }
    }



    async subscribe (config: ConsumerConfig, topics:string[], handlerMessages: Array<HandlerMessage>, fromBeginning = false){
        if(!topics || !handlerMessages) 
            return HandlerError.badRequest("[Kafka sub]","[Kafka]: sub args is BAD!");

        const admin = kafka.admin();
        await admin.connect();
        
        try {
          // Проверяем существование топиков
          const existingTopics = await admin.listTopics();
          const missingTopics = topics.filter(t => !existingTopics.includes(t));
          
          if (missingTopics.length > 0) {
            await admin.createTopics({
              topics: missingTopics.map(topic => ({
                topic,
                numPartitions:  Math.max(Number(process.env.KAFKA_BROCKERS_PARTIOTIONS), 3),
                replicationFactor: Math.max(Number(process.env.KAFKA_BROCKERS_REPLICATION_FACTOR), 1)
              })),
              waitForLeaders: true,
              timeout: 30000
            });
          }
        } finally {
          await admin.disconnect();
        }
      
        
        const consumer = kafka.consumer({
            groupId: config.groupId || "default-group",
            heartbeatInterval: config.heartbeatInterval || 3000,
            sessionTimeout: 10000,
            retry: {
                retries: 10
            }
        });

        this.consumers.push(consumer); // Сохраняем ссылку

        try {
            await consumer.connect();
            await consumer.subscribe({ topics, fromBeginning });
    
            consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    try {
                        const index = topics.indexOf(topic);
                        if (index !== -1) {
                            const parsedMessage = {
                                ...message,
                                value: message.value,
                                key: message.key?.toString(),
                                headers: this.parseHeaders(message.headers)
                            };
                            await handlerMessages[index]({ topic, partition, message: parsedMessage });
                        }
                    } catch (e) {
                        console.error(`Error processing message in ${topic}:`, e);
                    }
                },
            });
    
            // Обработка ошибок consumer
            consumer.on("consumer.crash", async (error) => {
                console.error("Consumer crashed:", error);
                await this.reconnectConsumer(consumer, config, topics, handlerMessages, fromBeginning);
            });
    
        } catch (error) {
            console.error("Subscription error:", error);
            await consumer.disconnect().catch(e => console.error("Disconnect error:", e));
            throw HandlerError.internal("[Kafka sub]", `Subscription failed: ${(error as Error).message}`);
        }
    }
    
    private parseHeaders(headers?: Record<string, any>) {
        if (!headers) return {};
        return Object.fromEntries(
            Object.entries(headers).map(([k, v]) => [k, v?.toString()])
        );
    }
    
    private async reconnectConsumer(consumer: Consumer, config: ConsumerConfig, topics: string[], handlers: Array<HandlerMessage>, fromBeginning: boolean) {
        try {
            await consumer.disconnect();
            await this.subscribe(config, topics, handlers, fromBeginning);
        } catch (e) {
            console.error("Reconnection failed:", e);
        }
    }

    public async shutdown() {
        await Promise.all(this.consumers.map(consumer => 
            consumer.disconnect().catch(e => console.error(e))
        ));
    }
    
}

export default new CustomKafka;