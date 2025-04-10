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
                first_name=$1,
                second_name=$2,
                middle_name=$3,
                phone=$4,
                email=$5,
                adress=$6,
                profession=$7 WHERE id=$8 RETURNING *;`,
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



    async statics(){
        try{
            const result = await pool.query(`
                WITH specialist_stats AS (
                    SELECT
                        s.id AS id,
                        s.first_name,
                        s.second_name,
                        s.middle_name,
                        s.profession,
                        COUNT(DISTINCT p.id) AS total_assigned_problems,
                        COUNT(DISTINCT CASE WHEN lp.is_solve = TRUE THEN p.id END) AS solved_problems,
                        ARRAY_AGG(DISTINCT t.id) AS assigned_theme_ids
                    FROM
                        specialists s
                    LEFT JOIN
                        specialists_by_theme st ON s.id = st.id_specialist
                    LEFT JOIN
                        themes t ON st.id_theme = t.id
                    LEFT JOIN
                        problems p ON (t.id = p.id_theme AND p.id_specialist = s.id)
                    LEFT JOIN
                        list_problems_client lp ON p.id = lp.id_problem
                    GROUP BY
                        s.id, s.first_name, s.second_name, s.middle_name, s.profession
                ),

                current_problems AS (
                    SELECT
                        p.id AS id_problem,
                        p.name AS problem_name,
                        t.id AS id_theme,
                        t.name AS theme_name,
                        COUNT(DISTINCT p.id) AS active_problems_count,
                        ARRAY_AGG(DISTINCT p.id) AS active_problem_ids
                    FROM
                        problems p
                    JOIN
                        list_problems_client lp ON p.id = lp.id_problem
                    JOIN
                        themes t ON p.id_theme = t.id
                    WHERE
                        lp.is_solve = FALSE
                        AND p.id_specialist IS NULL
                    GROUP BY
                        p.id, p.name, t.id, t.name
                )

                SELECT
                    ss.id,
                    ss.first_name,
                    ss.second_name,
                    ss.middle_name,
                    ss.profession,
                    ss.total_assigned_problems,
                    ss.solved_problems,
                    ss.assigned_theme_ids,
                    COALESCE(cp.active_problems_count,0) AS active_problems_count,
                    cp.active_problem_ids
                FROM
                    specialist_stats ss
                LEFT JOIN
                    current_problems cp ON cp.id_theme = ANY(ss.assigned_theme_ids)
                GROUP BY
                    ss.id, ss.first_name, ss.second_name, ss.middle_name, ss.profession,
                    ss.total_assigned_problems, ss.solved_problems,ss.assigned_theme_ids,
                    cp.active_problems_count, cp.active_problem_ids
                ORDER BY
                    active_problems_count DESC NULLS LAST;
            `);
            return result.rows;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

export default new SpecialistTable();
