import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_employee: number,
    first_name: string,
    second_name: string,
    middle_name: string
}



class ClientTable implements ITable, ICRUD{

    public readonly name = 'clients';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    first_name CHARACTER VARYING(64),
                    second_name CHARACTER VARYING(64),
                    middle_name CHARACTER VARYING(64)
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
                        AND column_name = 'id_employee'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_employee INT REFERENCES employees;
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
                id_employee,
                first_name,
                second_name,
                middle_name
            ) VALUES ($1, $2, $3, $4) RETURNING * ;`,
            [data.id_employee, data.first_name, data.second_name, data.middle_name]
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
                id_employee=$1,
                first_name=$2,
                second_name=$3,
                middle_name=$4 WHERE id=$5 RETURNING * ;`,
                [data.id_employee, data.first_name, data.second_name, data.middle_name, id]
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

export default new ClientTable();
