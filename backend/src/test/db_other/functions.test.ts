import "dotenv/config";
import assert from "assert";
import findByTheme from "../../db/functions/find_by_theme";
import findSpam from "../../db/functions/find_spam";


/*
describe("DB: Functions:", () => {

  it("findByTheme", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findByTheme.call(1);
    console.log(res);
    assert.equal(!res, false);
  });

  it("findSpam (only phone)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findSpam.call("123456789012","","","");
    console.log(res);
    assert.equal(!res, false);
  });

  it("findSpam (only client)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findSpam.call("","Григорий","Титов","Алексеевич");
    console.log(res);
    assert.equal(!res, false);
  });

  it("findSpam (full)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findSpam.call("123456789012","Григорий","Титов","Алексеевич");
    console.log(res);
    assert.equal(!res, false);
  });

  
  it("findSpam (have not)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findSpam.call("","51135","13","13");
    console.log(res);
    assert.equal(!res, true);
  });

 });
 */