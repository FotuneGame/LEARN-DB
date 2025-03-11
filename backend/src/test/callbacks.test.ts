import "dotenv/config";
import assert from "assert";
import callbacks from "../db/tables/callbacks";

import employees from "../db/tables/employees";
import clients from "../db/tables/clients";


let id_employee = 0, id_client = 0, id = 0;



describe("DB: Table callbacks:", () => {

  before(async ()=>{
    const employee = await employees.create({
        first_name: "Эдик",
        second_name: "Эдиковсм",
        middle_name: "Эдикович",
        phone:"7462445224",
        email:"some4@email.com",
        post: "Нищий разнорабочий"
    });
    if(!employee)
        return;
    id_employee = employee[0].id


    const client = await clients.create({
        id_employee: id_employee,
        first_name: "Костя",
        second_name: "не назвал",
        middle_name: "не назвал",
    });
    if(client)
        id_client = client[0].id;

  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.create({
        id_client: id_client,
        phone: "24145513431411",
        email: "user@gmail.com"
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.update(id,{
        id_client: id_client,
        phone: "8346335562254",
        email: "user@gmail.com"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.read(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.delete(id);
    console.log(res);
    assert.equal(!res, false);
  });


  after(async ()=>{
    await clients.delete(id_client);
    await employees.delete(id_employee);
  });
 });