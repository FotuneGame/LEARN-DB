import {pool} from "../pool";
import {IObjectDB} from "../types";

class findByTheme implements IObjectDB{

    public readonly name = "function_find_by_theme";

    async init(){
        try{
            const res = await pool.query(`
                CREATE OR REPLACE FUNCTION ${this.name}(id_theme_find INT)
                RETURNS TABLE (
                    id_answer INT,
                    answer_name VARCHAR,
                    id_employee INT,
                    employee_name VARCHAR,
                    id_specialist INT,
                    specialist_profession VARCHAR
                ) AS $$
                BEGIN
                    RETURN QUERY
                    -- Ответы по теме
                    SELECT 
                        a.id AS id_answer, 
                        a.name AS answer_name, 
                        NULL::INT AS id_employee, 
                        NULL::VARCHAR AS employee_name, 
                        NULL::INT AS id_specialist, 
                        NULL::VARCHAR AS specialist_profession
                    FROM answers a
                    JOIN answers_by_theme at ON a.id = at.id_answer
                    WHERE at.id_theme = id_theme_find
    
                    UNION ALL
    
                    -- Сотрудники по теме
                    SELECT 
                        NULL::INT AS id_answer, 
                        NULL::VARCHAR AS answer_name, 
                        e.id AS id_employee, 
                        e.first_name AS employee_name, 
                        NULL::INT AS id_specialist, 
                        NULL::VARCHAR AS specialist_profession
                    FROM employees e
                    JOIN employees_by_theme et ON e.id = et.id_employee
                    WHERE et.id_theme = id_theme_find
    
                    UNION ALL
    
                    -- Специалисты по теме
                    SELECT 
                        NULL::INT AS id_answer, 
                        NULL::VARCHAR AS answer_name, 
                        NULL::INT AS id_employee, 
                        NULL::VARCHAR AS employee_name, 
                        s.id AS id_specialist, 
                        s.profession AS specialist_profession
                    FROM specialists s
                    JOIN specialists_by_theme st ON s.id = st.id_specialist
                    WHERE st.id_theme = id_theme_find;
                END;
                $$ LANGUAGE plpgsql;
                `
            );
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }



    async call(id_theme:number){
        try{
            const res = await pool.query(`SELECT * FROM ${this.name}($1)`,[id_theme]);
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


export default new findByTheme();