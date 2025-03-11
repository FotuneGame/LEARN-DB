import "dotenv/config";
import assert from "assert";
import themes from "../db/tables/themes";



let id = 0;



describe("DB: Table theme:", () => {
  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await themes.create({name:"yes"});
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await themes.update(id,{name:"no"});
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await themes.read(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await themes.delete(id);
    console.log(res);
    assert.equal(!res, false);
  });
 });