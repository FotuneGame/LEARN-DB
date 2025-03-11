import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_client: number,
    phone:string,
    email:string
}




class CallbackTable implements ITable, ICRUD{

    public readonly name = 'callbacks';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    phone CHARACTER VARYING(32),
                    email CHARACTER VARYING(128)
                );
            `);
            return result;
        }catch(err){
            console.error(err);
            return false;
        }
    }

    async addConnetction(){
        try{
            const result = await pool.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_client'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_client INT REFERENCES clients ON DELETE CASCADE;
                    END IF;
                END $$;
            `);
            return result;
        }catch(err){
            console.error(err);
            return false;
        }
    }




    //CRUD
    async create(data:IData){
        try{
            const result = await pool.query(`INSERT INTO ${this.name} (
                id_client,
                phone,
                email
            ) VALUES ($1, $2, $3) RETURNING *;`,
                [data.id_client, data.phone, data.email]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async read(all:boolean,limit:number, offset:number){
        try{
            if(all){
                const result = await pool.query(`SELECT * FROM ${this.name};`);
                return result.rows;
            }else{
                const result = await pool.query(`SELECT * FROM ${this.name} LIMIT $1 OFFSET $2;`,
                    [limit,offset]
                );
                return result.rows;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id:number,data:IData){
        try{
            const result = await pool.query(`UPDATE ${this.name} SET 
                id_client=$1,
                phone=$2,
                email=$3 WHERE id=$4 RETURNING * ;`, 
                [data.id_client, data.phone, data.email,id]
            );
            return result.rows;   
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async delete(id:number){
        try{
            const result = await pool.query(`DELETE FROM ${this.name} WHERE id=$1 RETURNING * ;`,
                [id]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new CallbackTable();
