import redisConnection from "./redis";
import HandlerError from "../error";

class CustomRedis {
    private async executeCommand<T>(operation: string, callback: (client: any) => Promise<T>): Promise<T> {
        const redis = await redisConnection();
        try {
            return await callback(redis);
        } catch (err) {
            console.error(`[Redis ${operation}] Error:`, err);
            throw HandlerError.badRequest(`[Redis ${operation}]`, `Redis operation failed: ${err}`);
        } finally {
            await redis.quit();
        }
    }

    async get(key: string): Promise<Record<string, string>> {
        if (!key) throw HandlerError.badRequest("[Redis get]", "Key is required!");
        return this.executeCommand("get", async (redis) => {
            return await redis.hGetAll(key);
        });
    }

    async set(key: string, field: string, value: string): Promise<number> {
        if (!key || !field || !value) {
            throw HandlerError.badRequest("[Redis set]", "Key, field and value are required!");
        }
        return this.executeCommand("set", async (redis) => {
            const result = await redis.hSet(key, field, value);
            const seconds = Number(process.env.CODE_CONFIRM_ACTIVITY_MINUTE) * 60 || 30 * 60;
            await redis.expire(key, seconds);
            return result;
        });
    }

    async isHas(key: string): Promise<number> {
        if (!key) throw HandlerError.badRequest("[Redis isHas]", "Key is required!");
        return this.executeCommand("isHas", async (redis) => {
            return await redis.exists(key);
        });
    }

    async clearDBCache(): Promise<string> {
        return this.executeCommand("clearDBCache", async (redis) => {
            return await redis.flushDb();
        });
    }
}

export default new CustomRedis();