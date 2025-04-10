import "dotenv/config";
import assert from "assert";
import callsInSpam from "../../db/triggers/callsInSpam";

import calls from "../../db/tables/calls";

import clients from "../../db/tables/clients";
import employees from "../../db/tables/employees";


let id_client=0, id_employee=0, id_call = 0;


/*
describe("DB: Trigger:", () => {

  before(async ()=>{
  
      const employee = await employees.create({
          first_name: "Ахмед",
          second_name: "Ахмедович",
          middle_name: "Барс",
          phone:"25254254242",
          email:"some6@email.com",
          post: "Разнорабочий"
      });
      if(!employee)
        return;
      id_employee = employee[0].id


      const client = await clients.create({
          id_employee: id_employee,
          first_name: "Юра",
          second_name: "Генадьевич",
          middle_name: "Цацке",
      });
      if(!client)
        return;
      id_client = client[0].id
  });

  it("callsInSpam (have in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "123456789012",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: id_client,
        is_spam: false
    });
    console.log(res);
    assert.equal(!res, true);
  });

  it("callsInSpam (have NOT in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "431414131134",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: id_client,
        is_spam: false
    });
    console.log(res);
    if(res)
        id_call = res[0].id;
    assert.equal(!res, false);
  });


  after(async ()=>{
    await calls.delete(id_call);
    await clients.delete(id_client);
    await employees.delete(id_employee);
  });
 });*/