import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_theme:number,
    id_employee:number,
}



class EmployeesByThemeTable implements ITable, ICRUD{

    public readonly name = 'employees_by_theme';


    
    async createTable(){
        return true;
    }

    async addConnetction(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id_theme INT REFERENCES themes ON DELETE CASCADE,
                    id_employee INT REFERENCES employees ON DELETE CASCADE,
                    PRIMARY KEY (id_theme, id_employee)
                );
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
                id_theme,
                id_employee
            ) VALUES ($1, $2) RETURNING * ;`,
                [data.id_theme, data.id_employee]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async read(id:number){
        return true;
    }

    async readAll(id_theme:number, all:boolean,limit:number, offset:number){
        try{
            if(all){
                const result = await pool.query(`SELECT * FROM ${this.name} WHERE id_theme=$1;`, [id_theme]);
                return result.rows;
            }else{
                const result = await pool.query(`SELECT * FROM ${this.name} WHERE id_theme=$1 LIMIT $2 OFFSET $3;`,
                    [id_theme, limit, offset]
                );
                return result.rows;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id_theme:number,id_employee:number,data:IData){
        try{
            const result = await pool.query(`UPDATE ${this.name} SET 
                id_theme=$1,
                id_employee=$2 
                WHERE id_theme=$3 AND id_employee=$4 RETURNING * ;`,
                [data.id_theme, data.id_employee, id_theme, id_employee]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async delete(id_theme:number,id_employee:number){
        try{
            const result = await pool.query(`DELETE FROM ${this.name} WHERE id_theme=$1 AND id_employee=$2 RETURNING * ;`,
                [id_theme, id_employee]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new EmployeesByThemeTable();