import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_client:number,
    id_call:number,
}



class SpamTable implements ITable, ICRUD{

    public readonly name = 'spam';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY
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
                        ALTER TABLE ${this.name} ADD COLUMN id_client INT REFERENCES clients;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_call'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_call INT REFERENCES calls;
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
                id_call
                ) VALUES ($1, $2) RETURNING * ;`,
                [data.id_client, data.id_call]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async read(id:number){
        try{
            const result = await pool.query(`SELECT * FROM ${this.name} WHERE id=$1;`,
                [id]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async readAll(all:boolean,limit:number, offset:number){
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
                id_call=$1,
                id_client=$2 
                WHERE id=$3 RETURNING * ;`,
                [data.id_call, data.id_client, id]
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

export default new SpamTable();
