import { TablesType, ObjectsType } from "../types";



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


export const addObjectDB= async (obj:ObjectsType) =>{
    try {
        for (let el in obj){
            const result = await obj[el].init();
            if(result)
                console.log(`[addObjectDB] ${obj[el].name}: true`);
            else
                console.error("[addObjectDB] Error addObjectDB in : " + obj[el].name);
        }
    } catch (err) {
        console.error(err);
    }
}