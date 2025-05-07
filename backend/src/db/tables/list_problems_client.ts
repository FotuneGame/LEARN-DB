import { ITable, ICRUD } from "../types";
import {pool} from "../pool";



interface IData{
    id_problem:number,
    id_client:number,
    is_solve: boolean,
}



class ListProblemsClientTable implements ITable, ICRUD{

    public readonly name = 'list_problems_client';


    
    async createTable(){
        try{
            const result = await pool.query(`
                CREATE TABLE IF NOT EXISTS ${this.name} (
                    is_solve BOOLEAN DEFAULT FALSE
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
                        AND column_name = 'id_problem'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_problem INT NOT NULL REFERENCES problems ON DELETE CASCADE;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 
                        FROM information_schema.columns 
                        WHERE table_name = '${this.name}' 
                        AND column_name = 'id_client'
                    ) THEN
                        ALTER TABLE ${this.name} ADD COLUMN id_client INT NOT NULL REFERENCES clients ON DELETE CASCADE;
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
                id_problem,
                id_client,
                is_solve
            ) VALUES ($1, $2, $3) RETURNING * ;`,
                [data.id_problem, data.id_client, data.is_solve]
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

    async readAll(id_client:number, all:boolean,limit:number, offset:number){
        try{
            if(all){
                const result = await pool.query(`SELECT * FROM ${this.name} WHERE id_client=$1;`, [id_client]);
                return result.rows;
            }else{
                const result = await pool.query(`SELECT * FROM ${this.name} WHERE id_client=$1 LIMIT $2 OFFSET $3;`,
                    [id_client, limit, offset]
                );
                return result.rows;
            }
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async findAllByIdClient(id_client:number){
        try{
            const result = await pool.query(`
                SELECT p.id, p.name , lpc.is_solve
                FROM problems p
                JOIN ${this.name} lpc ON p.id = lpc.id_problem
                WHERE lpc.id_client = $1;
                `,
                [id_client]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id_client:number,id_problem:number,data:IData){
        try{
            const result = await pool.query(`UPDATE ${this.name} SET 
                id_problem=$1,
                id_client=$2,
                is_solve=$3
                WHERE id_problem=$4 AND id_client=$5 RETURNING * ;`,
                [data.id_problem, data.id_client, data.is_solve, id_problem, id_client]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async updateSolve(id_problem:number,is_solve:boolean){
        try{
            const result = await pool.query(`UPDATE ${this.name} SET 
                is_solve=$1
                WHERE id_problem=$2 RETURNING * ;`,
                [is_solve, id_problem]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async delete(id_client:number,id_problem:number){
        try{
            const result = await pool.query(`DELETE FROM ${this.name} WHERE id_client=$1 AND id_problem=$2 RETURNING * ;`,
                [id_client, id_problem]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async deleteAll(id_client:number){
        try{
            const result = await pool.query(`DELETE FROM ${this.name} WHERE id_client=$1 RETURNING * ;`,
                [id_client]
            );
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new ListProblemsClientTable();