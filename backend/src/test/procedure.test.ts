import "dotenv/config";
import assert from "assert";
import changeEmployee from "../db/procedures/changeEmployee";



describe("DB: Procedure:", () => {

  it("change Employee (have)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await changeEmployee.call(1,"Антон","Верхмат","Нарутович");
    console.log("Процедура и не должна ничего возвращать: ",res);
    assert.equal(!res, false);
  });

  it("change Employee (not have)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await changeEmployee.call(1,"faafadf","Верreхмат","reererq");
    console.log("Процедура и не должна ничего возвращать: ",res);
    assert.equal(!res, false);
  });


 });