import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    first_name:string,
    second_name:string,
    middle_name:string,
    phone:string,
    email:string,
    adress:string,
    profession:string
}



class SpecialistTable implements ITable, ICRUD{

    public readonly name = 'specialists';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    first_name CHARACTER VARYING(64),
                    second_name CHARACTER VARYING(64),
                    middle_name CHARACTER VARYING(64),
                    phone CHARACTER VARYING(32),
                    email CHARACTER VARYING(128),
                    adress CHARACTER VARYING(512),
                    profession CHARACTER VARYING(128)
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
                first_name,
                second_name,
                middle_name,
                phone,
                email,
                adress,
                profession
                ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, 
                [data.first_name, data.second_name, data.middle_name, data.phone, data.email, data.adress, data.profession]);
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
                first_name=$1,
                second_name=$2,
                middle_name=$3,
                profession=$4,
                adress=$5,
                phone=$6,
                email=$7 WHERE id=$8 RETURNING *;`,
                [data.first_name, data.second_name, data.middle_name, data.phone, data.email, data.adress, data.profession, id]
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

export default new SpecialistTable();
