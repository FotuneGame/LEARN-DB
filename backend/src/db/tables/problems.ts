import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_theme: number | null,
    id_employee: number | null,
    id_answer: number | null,
    id_specialist: number | null,
    name: string,
    describe: string
}



class ProblemsTable implements ITable, ICRUD{

    public readonly name = 'problems';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    id SERIAL PRIMARY KEY,
                    name CHARACTER VARYING(256),
                    describe TEXT
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
                        AND column_name = 'id_theme'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_theme INT REFERENCES themes;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_employee'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_employee INT REFERENCES employees;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_specialist'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_specialist INT REFERENCES specialists;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_answer'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_answer INT REFERENCES answers;
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
                id_theme,
                id_employee,
                id_answer,
                id_specialist,
                name,
                describe
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ;`,
            [data.id_theme, data.id_employee, data.id_answer, data.id_specialist, data.name, data.describe]
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
                id_theme=$1,
                id_employee=$2,
                id_answer=$3,
                id_specialist=$4,
                name=$5,
                describe=$6
                WHERE id=$7 RETURNING * ;`,
                [data.id_theme, data.id_employee, data.id_answer, data.id_specialist, data.name, data.describe, id]
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

export default new ProblemsTable();
