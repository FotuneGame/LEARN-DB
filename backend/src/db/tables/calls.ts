import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    phone:string,
    date: Date, //преобразует YYYY-MM-DD
    time: Date //преобразует HH:MM:SS
}



class CallTable implements ITable, ICRUD{

    public readonly name = 'calls';


    
    async createTable(){
        try{
            //DATE DEFAULT GETDATE() для SQL сервера
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    phone CHARACTER VARYING(32),
                    date DATE DEFAULT CURRENT_DATE,
                    time TIME
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
                phone,
                date,
                time
            ) VALUES ($1, $2, $3) RETURNING * ;`,
                [data.phone, data.date, data.time.toTimeString().split(' ')[0]]
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
                phone=$1,
                date=$2,
                time=$3 WHERE id=$4 RETURNING * ;`,
                [data.phone, data.date, data.time.toTimeString().split(' ')[0], id]
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

export default new CallTable();
