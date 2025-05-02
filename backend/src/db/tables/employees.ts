import { ITable, ICRUD } from "../types";
import {pool} from "../pool";


interface IData{
    first_name:string,
    second_name:string,
    middle_name:string,
    phone:string,
    email:string,
    post:string
}


class EmployeeTable implements ITable, ICRUD{

    public readonly name = 'employees';


    
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
                    post CHARACTER VARYING(128)
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
                post,
                phone,
                email
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;`, 
                [data.first_name, data.second_name, data.middle_name, data.post, data.phone, data.email]
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

    async readByEmail(email:string){
        try{
            const result = await pool.query(`SELECT * FROM ${this.name} WHERE email=$1;`,
                [email]
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
                first_name=$1,
                second_name=$2,
                middle_name=$3,
                post=$4,
                phone=$5,
                email=$6 WHERE id=$7 RETURNING * ;`,
                [data.first_name, data.second_name, data.middle_name, data.post, data.phone, data.email, id]
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


    async statics(){
        try{
            const result = await pool.query(`
                SELECT 
                    e.id AS id,
                    e.first_name,
                    e.second_name,
                    e.middle_name,
                    e.post,
                    COUNT(DISTINCT c.id) AS total_clients_assigned,
                    COUNT(DISTINCT CASE WHEN lpc.is_solve = TRUE THEN lpc.id_client END) AS clients_with_solved_problems,
                    COUNT(DISTINCT lpc.id_problem) AS total_problems_handled,
                    COUNT(DISTINCT CASE WHEN lpc.is_solve = TRUE THEN lpc.id_problem END) AS solved_problems
                FROM 
                    employees e
                LEFT JOIN 
                    clients c ON e.id = c.id_employee
                LEFT JOIN 
                    list_problems_client lpc ON c.id = lpc.id_client
                GROUP BY 
                    e.id,
                    e.first_name,
                    e.second_name,
                    e.middle_name,
                    e.post
                ORDER BY 
                    total_clients_assigned DESC;
            `);
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new EmployeeTable();
