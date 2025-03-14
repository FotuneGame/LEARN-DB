import {pool} from "../pool";
import {IObjectDB} from "../types";

class changeEmployee implements IObjectDB{
    
    public readonly name = "procedure_change_employee";


    async init(){
        try{
            const res = await pool.query(`
                CREATE OR REPLACE PROCEDURE ${this.name}(
                    id_client INT, -- ID клиента, которого нужно обновить
                    employee_first_name VARCHAR, -- Имя сотрудника
                    employee_second_name VARCHAR, -- Фамилия сотрудника
                    employee_middle_name VARCHAR -- Отчество сотрудника
                ) AS $$
                DECLARE
                    emp_id INT; -- Переменная для хранения id_employee
                BEGIN
                    -- Находим id сотрудника по ФИО
                    SELECT id INTO emp_id
                    FROM employees
                    WHERE first_name = employee_first_name
                    AND second_name = employee_second_name
                    AND middle_name = employee_middle_name;

                    -- Если сотрудник найден, обновляем id_employee в таблице clients
                    IF emp_id IS NOT NULL THEN
                        UPDATE clients
                        SET id_employee = emp_id
                        WHERE id = id_client;
                    ELSE
                        RAISE NOTICE 'Сотрудник с ФИО % % % не найден.', employee_first_name, employee_second_name, employee_middle_name;
                    END IF;
                END;
                $$ LANGUAGE plpgsql;
                `);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }



    async call(id_client:number, first_name: string, second_name: string, middle_name: string){
        try{
            const res = await pool.query(`CALL ${this.name}($1, $2, $3, $4);`,
                [id_client, first_name, second_name, middle_name]
            );
            return true;
        }catch(err){
            console.error(err);
            return false;
        }
    }


    async delete(){
        try{
            const res = await pool.query(`DROP PROCEDURE IF EXISTS ${this.name};`);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}


export default new changeEmployee();