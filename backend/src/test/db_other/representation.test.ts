import "dotenv/config";
import assert from "assert";
import clientEmployee from "../../db/representation/clientEmployee";
import clientCallbacks from "../../db/representation/clientCallbacks";

/*
describe("DB: Representation:", () => {

  it("clientEmployee (all)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await clientEmployee.readAll();
    console.log(res);
    assert.equal(!res, false);
  });

  it("clientEmployee (id_client=1)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await clientEmployee.read(1);
    console.log(res);
    assert.equal(!res, false);
  });


  it("clientCallbacks (all)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await clientCallbacks.readAll();
    console.log(res);
    assert.equal(!res, false);
  });

  it("clientCallbacks (id_client=1)", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await clientCallbacks.read(1);
    console.log(res);
    assert.equal(!res, false);
  });

 });*/