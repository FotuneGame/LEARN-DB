import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    name:string,
    describe: string,
    important:string
}




class AnswerTable implements ITable, ICRUD{
    
    public readonly name = 'answers';



    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    name CHARACTER VARYING(256),
                    describe TEXT,
                    important TEXT
                );
            `);
            return result;
        }catch(err){
            console.error(err);
            return false;
        }
    }

    async addConnetction(){
        return true;
    }



    //CRUD
    async create(data:IData){
        try{
            const result = await pool.query(`INSERT INTO ${this.name} (
                name,
                describe,
                important
            ) VALUES ($1, $2, $3) RETURNING * ;`,
                [data.name, data.describe, data.important]
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
                name=$1,
                describe=$2,
                important=$3 WHERE id=$4 RETURNING * ;`, 
                [data.name, data.describe, data.important, id]
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

export default new AnswerTable();
