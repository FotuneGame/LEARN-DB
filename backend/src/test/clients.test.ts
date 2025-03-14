import "dotenv/config";
import assert from "assert";
import clients from "../db/tables/clients";
import employees from "../db/tables/employees";


let id_employee = 0, id = 0;



describe("DB: Table clients:", () => {

  before(async ()=>{
    const employee = await employees.create({
        first_name: "Саша",
        second_name: "Эмиров",
        middle_name: "Фаресеев",
        phone:"54424364632",
        email:"some3@email.com",
        post: "Босс Разнорабочих"
    });
    if(employee)
        id_employee = employee[0].id
  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await clients.create({
        id_employee: id_employee,
        first_name: "Павел",
        second_name: "Филимк",
        middle_name: "Тагирович",
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await clients.update(id,{
        id_employee: id_employee,
        first_name: "Павел",
        second_name: "Филимков",
        middle_name: "Тагирович",
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await clients.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await clients.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await clients.delete(id);
    console.log(res);
    assert.equal(!res, false);
  });

  

  after(async ()=>{
    await employees.delete(id_employee);
  });
 });