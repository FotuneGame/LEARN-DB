import "dotenv/config";
import assert from "assert";
import calls from "../db/tables/calls";



let id = 0;



describe("DB: Table calls:", () => {
  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.create({
        phone: "89533496109",
        date: new Date(), //YYYY-MM-DD
        time: new Date((60*60*60)) //HH:MM:SS
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
        time: new Date((60*60*60)) //HH:MM:SS
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.read(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await calls.delete(id);
    console.log(res);
    assert.equal(!res, false);
  });
 });