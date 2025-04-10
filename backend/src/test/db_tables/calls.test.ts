import "dotenv/config";
import assert from "assert";
import calls from "../../db/tables/calls";

import clients from "../../db/tables/clients";
import employees from "../../db/tables/employees"


let id_client=0, id_employee=0, id = 0;



describe("DB: Table calls:", () => {

  before(async ()=>{

        const employee = await employees.create({
            first_name: "Витя",
            second_name: "Кашков",
            middle_name: "Ильич",
            phone:"89533496109",
            email:"some@email.com",
            post: "Разнорабочий"
        });
        if(!employee)
          return;
        id_employee = employee[0].id


        const client = await clients.create({
            id_employee: id_employee,
            first_name: "Валерий",
            second_name: "Велрьевич",
            middle_name: "Цацке",
        });
        if(!client)
          return;
        id_client = client[0].id
  })

  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "89533496109",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: id_client,
        is_spam: false,
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.update(id,{
        phone: "+79533496108",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: id_client,
        is_spam: true,
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  


  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await calls.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });

    after(async ()=>{
        await clients.delete(id_client);
        await employees.delete(id_employee);
    });
  }
 });