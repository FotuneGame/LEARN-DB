import "dotenv/config";
import assert from "assert";
import spam from "../db/tables/spam";

import employees from "../db/tables/employees";
import clients from "../db/tables/clients";
import calls from "../db/tables/calls";


let id_employee = 0, id_client = 0, id_call = 0, id = 0;



describe("DB: Table spam:", () => {

  before(async ()=>{
    const employee = await employees.create({
        first_name: "Антон",
        second_name: "Верхмат",
        middle_name: "Нарутович",
        phone:"214153747345",
        email:"some2@email.com",
        post: "Главный Разнорабочий"
    });
    if(!employee)
        return;
    id_employee = employee[0].id


    const client = await clients.create({
        id_employee: id_employee,
        first_name: "Григорий",
        second_name: "Титов",
        middle_name: "Алексеевич",
    });
    if(client)
        id_client = client[0].id;


    const call = await calls.create({
        phone: "123456789012",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)) //HH:MM:SS
    })
    if(call)
        id_call = call[0].id;
  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await spam.create({
        id_client: id_client,
        id_call: id_call
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await spam.update(id,{
        id_client: id_client,
        id_call: id_call
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await spam.read(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await spam.delete(id);
    console.log(res);
    assert.equal(!res, false);
  });


  after(async ()=>{
    await clients.delete(id_client);
    await employees.delete(id_employee);
    await calls.delete(id_call);
  });
 });