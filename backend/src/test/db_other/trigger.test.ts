import "dotenv/config";
import assert from "assert";

import calls from "../../db/tables/calls";


let id_call1 = 0, id_call2 = 0;


 //работает после заполненой тестовыми данными таблицой
describe("DB: Trigger:", () => {


  it("callsInSpam (have in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "+79533496108",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: 1,
        is_spam: false
    });
    if(res)
      id_call1 = res[0].id;
    console.log(res);
    assert.equal(!res, true);
  });

  it("callsInSpam (have NOT in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "431414131134",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)), //HH:MM:SS
        id_client: 1,
        is_spam: false
    });
    console.log(res);
    if(res)
        id_call2 = res[0].id;
    assert.equal(!res, false);
  });


  after(async ()=>{
    if(id_call1)
      await calls.delete(id_call1);
    if(id_call2)
      await calls.delete(id_call2);
  });
 });