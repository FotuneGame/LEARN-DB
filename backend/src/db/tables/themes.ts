import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    name:string
}



class ThemeTable implements ITable, ICRUD{

    public readonly name = 'themes';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    name CHARACTER VARYING(256)
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
            const result = await pool.query(
                `INSERT INTO ${this.name} (name) VALUES ($1) RETURNING *;`,
                [data.name]
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
                    [limit, offset]
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
            const result = await pool.query(`UPDATE ${this.name} SET name = $1 WHERE id = $2 RETURNING * ;`,
                [data.name, id]
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
                    t.id AS id,
                    t.name AS name,
                    COUNT(DISTINCT p.id) AS total_problems_in_theme,
                    COUNT(DISTINCT lp.id_client) AS unique_clients_count,
                    COUNT(DISTINCT c.id) AS total_calls_count,
                    COUNT(DISTINCT CASE WHEN lp.is_solve = TRUE THEN lp.id_client END) AS clients_with_solutions
                FROM
                    themes t
                LEFT JOIN
                    problems p ON t.id = p.id_theme
                LEFT JOIN
                    list_problems_client lp ON p.id = lp.id_problem
                LEFT JOIN
                    calls c ON lp.id_client = c.id_client
                GROUP BY
                    t.id, t.name
                ORDER BY
                    unique_clients_count DESC;
            `);
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new ThemeTable();
