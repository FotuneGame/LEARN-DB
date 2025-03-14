import {QueryResult} from "pg";

export interface ICRUD{
    create: (data:any) => Promise<Array<any> | boolean>,
    read: ((id:number)=>Promise<Array<any> | boolean>),
    readAll: ((all:boolean,limit:number, offset:number)=>Promise<Array<any> | boolean>) | ((id_from:number, all:boolean, limit:number, offset:number)=>Promise<Array<any> | boolean>),
    update: ((id:number,data:any)=>Promise<Array<any> | boolean>) | ((id_from:number, id_to:number,data:any)=>Promise<Array<any> | boolean>),
    delete: ((id:number)=>Promise<Array<any> | boolean>) | ((id_from:number, id_to:number)=>Promise<Array<any> | boolean>) 
}

export interface ITable{
    name: string,
    createTable: () => Promise<QueryResult<any> | boolean>
    addConnetction: () => Promise<QueryResult<any> | boolean>
}

export type TablesType = {
    [key:string]: ITable,
}

export interface IObjectDB {
    name: string,
    init: () => Promise<QueryResult<any> | boolean>,
    delete: () => Promise<QueryResult<any> | boolean>
}

export type ObjectsType = {
    [key:string]: IObjectDB
}