import {pool} from "../pool";
import {IObjectDB} from "../types";



class clientCallbacks implements IObjectDB{
    
    public readonly name = "representation_client_callbacks";


    async init(){
        try{
            const res = await pool.query(`
                    CREATE OR REPLACE VIEW ${this.name} AS
                    SELECT
                        cl.id AS id_client,
                        cl.first_name AS first_name,
                        cl.second_name AS second_name,
                        cl.middle_name AS middle_name,
                        ca.id AS id_callback,
                        ca.phone AS phone,
                        ca.email AS email
                    FROM
                        callbacks ca
                    LEFT JOIN
                        clients cl ON ca.id_client = cl.id;
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