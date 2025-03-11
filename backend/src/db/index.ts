import {pool} from "./pool";
import {tabels} from "./tables";
import {createTables, addConnectionTables} from "./utils";



export const poolSync = ()=>{
    pool.query('SELECT NOW()', async (err, res) => {
        if(err) {
          console.error('Error connecting to the database', err.stack);
        } else {
          console.log('Connected to the database:', res.rows);
          try{
            await createTables(tabels);
            await addConnectionTables(tabels);
          }catch(err){
            console.error(err);
          }
        }
    });
}

export default pool;