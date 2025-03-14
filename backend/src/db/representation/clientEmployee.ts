import {pool} from "../pool";
import {IObjectDB} from "../types";



class clientEmployee implements IObjectDB{
    
    public readonly name = "representation_client_employee";


    async init(){
        try{
            const res = await pool.query(`
                    CREATE OR REPLACE VIEW ${this.name} AS
                    SELECT
                        c.id AS id_client,
                        c.first_name AS client_first_name,
                        c.second_name AS client_second_name,
                        c.middle_name AS client_middle_name,
                        e.id AS id_employee,
                        e.first_name AS employee_first_name,
                        e.second_name AS employee_second_name,
                        e.middle_name AS employee_middle_name,
                        e.post AS employee_post
                    FROM
                        clients c
                    LEFT JOIN
                        employees e ON c.id_employee = e.id;
                `);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }

    
    async read(id_client:number){
        try{
            const res = await pool.query(`SELECT * FROM ${this.name} WHERE id_client=$1 ;`,
                [id_client]
            );
            return res.rows;
        }catch(err){
            console.error(err);
            return false;
        }
    }


    async readAll(){
        try{
            const res = await pool.query(`SELECT * FROM ${this.name};`);
            return res.rows;
        }catch(err){
            console.error(err);
            return false;
        }
    }


    async delete(){
        try{
            const res = await pool.query(`DROP VIEW IF EXISTS ${this.name};`);
            return res;
        }catch(err){
            console.error(err);
            return false;
        }
    }
}


export default new clientEmployee();