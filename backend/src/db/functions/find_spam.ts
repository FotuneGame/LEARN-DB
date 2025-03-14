import {pool} from "../pool";
import {IObjectDB} from "../types";

class findSpam implements IObjectDB{
    
    public readonly name = "find_spam";


    async init(){
        try{
            const res = await pool.query(`
                CREATE OR REPLACE FUNCTION ${this.name}(phone_find VARCHAR, first_name_find VARCHAR, second_name_find VARCHAR, middle_name_find VARCHAR)
                RETURNS BOOLEAN AS $$
                DECLARE
                    spam_exists BOOLEAN;
                BEGIN
                    -- Проверяем, есть ли запись в таблице spam, соответствующая данным из client и call
                    SELECT EXISTS (
                        SELECT 1
                        FROM spam s
                        JOIN clients c ON s.id_client = c.id
                        JOIN calls cl ON s.id_call = cl.id
                        WHERE (cl.phone = phone_find)
                        OR (c.first_name = first_name_find
                        AND c.second_name = second_name_find
                        AND c.middle_name = middle_name_find)
                    ) INTO spam_exists;

                    -- Возвращаем результат
                    RETURN spam_exists;
                END;
                $$ LANGUAGE plpgsql;
                `);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }



    async call(phone:string, first_name: string, second_name: string, middle_name: string){
        try{
            const res = await pool.query(`SELECT * FROM ${this.name}($1, $2, $3, $4);`,
                [phone,first_name,second_name,middle_name]
            );
            return (res.rows[0].find_spam as boolean);
        }catch(err){
            console.error(err);
            return false;
        }
    }


    async delete(){
        try{
            const res = await pool.query(`DROP FUNCTION IF EXISTS ${this.name};`);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}


export default new findSpam();