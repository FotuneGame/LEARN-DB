import { TablesType } from "../types";



export const createTables = async (tables:TablesType)=>{
    try {
        for (let el in tables){
            const result = await tables[el].createTable();
            if(result)
                console.log(`[createTables] ${tables[el].name}: true`);
            else
                console.error("[createTables] Error createTable in: " + tables[el].name);
        }
    } catch (err) {
        console.error(err);
    }
}



export const addConnectionTables = async (tables:TablesType)=>{
    try {
        for (let el in tables){
            const result = await tables[el].addConnetction();
            if(result)
                console.log(`[addConnectionTables] ${tables[el].name}: true`);
            else
                console.error("[addConnectionTables] Error addConnectionTable in : " + tables[el].name);
        }
    } catch (err) {
        console.error(err);
    }
}