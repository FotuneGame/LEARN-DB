import "dotenv/config";
import assert from "assert";
import callsInSpam from "../db/triggers/callsInSpam";

import calls from "../db/tables/calls";


let id_call = 0;



describe("DB: Trigger:", () => {


  it("callsInSpam (have in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "123456789012",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)) //HH:MM:SS
    });
    console.log(res);
    assert.equal(!res, true);
  });

  it("callsInSpam (have NOT in spam)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "431414131134",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)) //HH:MM:SS
    });
    console.log(res);
    if(res)
        id_call = res[0].id;
    assert.equal(!res, false);
  });


  after(async ()=>{
    await calls.delete(id_call);
  });
 });