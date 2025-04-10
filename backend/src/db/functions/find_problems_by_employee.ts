import {pool} from "../pool";
import {IObjectDB} from "../types";

class findProblemsByEmployee implements IObjectDB{
    
    public readonly name = "function_find_problems_by_employee";


    async init(){
        try{
            const res = await pool.query(`
                CREATE OR REPLACE FUNCTION ${this.name}(employee_id INT)
                RETURNS TABLE (
                    id_client INT,
                    first_name VARCHAR,
                    second_name VARCHAR,
                    middle_name VARCHAR,
                    problems JSONB[]
                ) AS $$
                BEGIN
                    RETURN QUERY
                    SELECT
                        c.id AS id_client,
                        c.first_name,
                        c.second_name,
                        c.middle_name,
                        ARRAY(
                            SELECT jsonb_build_object(
                                'id_problem', p.id,
                                'name', p.name,
                                'description', p.describe,
                                'id_theme', t.id,
                                'theme_name', t.name,
                                'is_solve', lp.is_solve,
                                'callbacks', jsonb_build_object(
                                    'phone', ca.phone,
                                    'email', ca.email
                                ),
                                'solution', CASE 
                                    WHEN lp.is_solve THEN jsonb_build_object(
                                        'id_answer', a.id,
                                        'id_employee', em.id,
                                        'id_specialist', sp.id
                                    )
                                    ELSE NULL
                                END
                            )
                            FROM list_problems_client lp
                            JOIN problems p ON lp.id_problem = p.id
                            LEFT JOIN themes t ON p.id_theme = t.id
                            LEFT JOIN answers a ON p.id_answer = a.id
                            LEFT JOIN employees em ON p.id_employee = em.id
                            LEFT JOIN specialists sp ON p.id_specialist = sp.id
                            LEFT JOIN callbacks ca ON p.id = ca.id_problem
                            WHERE lp.id_client = c.id
                            ORDER BY lp.is_solve, p.name
                        ) AS problems
                    FROM
                        clients c
                    WHERE
                        c.id_employee = employee_id
                    ORDER BY
                        id_client;
                END;
                $$ LANGUAGE plpgsql;
                `);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }



    async call(id_employee:number){
        try{
            const res = await pool.query(`SELECT * FROM ${this.name}($1);`,
                [id_employee]
            );
            return res.rows;
        }catch(err){
            console.error(err);
            return false;
        }
    }


    async delete(){
        try{
            const res = await pool.query(`DROP FUNCTION IF EXISTS ${this.name};`);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}


export default new findProblemsByEmployee();