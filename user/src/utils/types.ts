export type JWTType = {
    id:number, 
    name:string, 
    password:string,
    email:string,
}

export type CodeType = "auth" | "registration" | "forget" | "security" | "delete_account";

export type CodeRedisType = {
    code: string,
    time: string,
    confirm: string,
    type: CodeType
}