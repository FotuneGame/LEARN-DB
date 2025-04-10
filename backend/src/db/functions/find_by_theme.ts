import {pool} from "../pool";
import {IObjectDB} from "../types";

class findByTheme implements IObjectDB{

    public readonly name = "function_find_by_theme";

    async init(){
        try{
            const res = await pool.query(`
                CREATE OR REPLACE FUNCTION ${this.name}(id_theme_find INT)
                RETURNS TABLE (
                    answers JSONB[],
                    employees JSONB[],
                    specialists JSONB[]
                ) AS $$
                BEGIN
                    RETURN QUERY
                    SELECT 
                        -- Массив ответов
                        ARRAY(
                            SELECT jsonb_build_object(
                                'id_answer', a.id,
                                'answer_name', a.name,
                                'description', a.describe,
                                'important', a.important
                            )
                            FROM answers a
                            JOIN answers_by_theme at ON a.id = at.id_answer
                            WHERE at.id_theme = id_theme_find
                        ) AS answers,
                        
                        -- Массив сотрудников
                        ARRAY(
                            SELECT jsonb_build_object(
                                'id_employee', e.id,
                                'first_name', e.first_name,
                                'second_name', e.second_name,
                                'middle_name', e.middle_name,
                                'phone', e.phone,
                                'email', e.email,
                                'post', e.post
                            )
                            FROM employees e
                            JOIN employees_by_theme et ON e.id = et.id_employee
                            WHERE et.id_theme = id_theme_find
                        ) AS employees,
                        
                        -- Массив специалистов
                        ARRAY(
                            SELECT jsonb_build_object(
                                'id_specialist', s.id,
                                'first_name', s.first_name,
                                'second_name', s.second_name,
                                'middle_name', s.middle_name,
                                'profession', s.profession,
                                'phone', s.phone,
                                'email', s.email,
                                'adress', s.adress
                            )
                            FROM specialists s
                            JOIN specialists_by_theme st ON s.id = st.id_specialist
                            WHERE st.id_theme = id_theme_find
                        ) AS specialists;
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