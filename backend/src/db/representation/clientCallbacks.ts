import {pool} from "../pool";
import {IObjectDB} from "../types";



class clientCallbacks implements IObjectDB{
    
    public readonly name = "representation_client_callbacks";


    async init(){
        try{
            const res = await pool.query(`
                    CREATE OR REPLACE VIEW ${this.name} AS
                    SELECT
                        ca.id as id_callback,
                        ca.phone AS phone,
                        ca.email AS email,
                        cl.id AS id_client,
                        cl.first_name,
                        cl.second_name,
                        cl.middle_name
                    FROM
                        callbacks ca
                    LEFT JOIN
                        problems p ON ca.id_problem = p.id
                    LEFT JOIN
                        list_problems_client lpc ON p.id = lpc.id_problem
                    LEFT JOIN
                        clients cl ON cl.id = lpc.id_client;
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


export default new clientCallbacks();