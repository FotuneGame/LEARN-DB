import {pool} from "./pool";
import {tabels} from "./tables";
import { dbTriggers } from "./triggers";
import { dbFunctions } from "./functions";
import { dbProcedures } from "./procedures";
import { dbRepresentation } from "./representation";
import {createTables, addConnectionTables, addObjectDB} from "./utils";



export const poolSync = ()=>{
    pool.query('SELECT NOW()', async (err, res) => {
        if(err) {
          console.error('Error connecting to the database', err.stack);
        } else {
          console.log('Connected to the database:', res.rows);
          try{
            await createTables(tabels);
            await addConnectionTables(tabels);

            await addObjectDB(dbTriggers);
            await addObjectDB(dbFunctions);
            await addObjectDB(dbProcedures);
            await addObjectDB(dbRepresentation);
          }catch(err){
            console.error(err);
          }
        }
    });
}

export default pool;