import {pool} from "../pool";
import {IObjectDB} from "../types";



class callsInSpam implements IObjectDB{
    
    public readonly name = "trigger_dublicate_calls_in_spam";

    //phone:string
    async init(){
        try{
            await pool.query('BEGIN'); // Начало транзакции
            //Функция для триггера
            await pool.query(`
                    CREATE OR REPLACE FUNCTION function_check_spam_by_phone()
                    RETURNS TRIGGER AS $$
                    BEGIN
                        -- Проверяем, есть ли номер телефона в таблице spam
                        IF EXISTS (
                            SELECT 1
                            FROM calls c
                            WHERE c.phone = NEW.phone AND c.is_spam = TRUE
                        ) THEN
                            RAISE EXCEPTION 'Номер телефона % найден в списке спама.', NEW.phone;
                        END IF;

                        -- Если номер не найден, разрешаем операцию
                        RETURN NEW;
                    END;
                    $$ LANGUAGE plpgsql;
                `);
            
            const res = await pool.query(`
                    CREATE OR REPLACE TRIGGER ${this.name}
                    BEFORE INSERT OR UPDATE ON calls
                    FOR EACH ROW
                    EXECUTE FUNCTION function_check_spam_by_phone();
                `);
            await pool.query('COMMIT'); // Подтверждение транзакции
            return res;
        }catch(err){
            await pool.query('ROLLBACK'); // Откат транзакции в случае ошибки
            console.error(err);
            return false;
        }
    }


    async delete(){
        try{
            await pool.query('BEGIN'); // Начало транзакции
            await pool.query('DROP FUNCTION IF EXISTS function_check_spam_by_phone;');
            await pool.query(`DROP TRIGGER IF EXISTS ${this.name} ON calls;`);
            await pool.query('COMMIT'); // Подтверждение транзакции
            return true;
        }catch(err){
            await pool.query('ROLLBACK'); // Откат транзакции в случае ошибки
            console.error(err);
            return false;
        }
    }
}


export default new callsInSpam();