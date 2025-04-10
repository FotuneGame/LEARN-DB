import "dotenv/config";
import assert from "assert";
import changeEmployee from "../../db/procedures/changeEmployee";

import clients from "../../db/tables/clients";
import employees from "../../db/tables/employees";

let id_employee = 0, id_client = 0;


describe("DB: Procedure:", () => {

  before(async ()=>{
    const client = await clients.create({
      id_employee: 1,
      first_name: "Harold",
      second_name: "Lol",
      middle_name: "KEK",
    });
    if(client)
      id_client = client[0].id;


    const employee = await employees.create({
      first_name:"Антон",
      second_name:"Верхмат",
      middle_name:"Нарутович",
      post:"Случайны прохожий",
      email:"sas@yandex.com",
      phone:"31241343133"
    });
    if(employee)
      id_employee = employee[0].id;
  });

  it("change Employee (have)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await changeEmployee.call(id_client,"Антон","Верхмат","Нарутович");
    console.log("Процедура и не должна ничего возвращать: ",res);
    assert.equal(!res, false);
  });

  it("change Employee (not have)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await changeEmployee.call(id_client,"faafadf","Верreхмат","reererq");
    console.log("Процедура и не должна ничего возвращать: ",res);
    assert.equal(!res, true);
  });

  after(async()=>{
    await clients.delete(id_client);
    await employees.delete(id_employee);
  })
 });