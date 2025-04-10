import "dotenv/config";
import assert from "assert";
import callbacks from "../../db/tables/callbacks";

import problems from "../../db/tables/problems";
import clients from "../../db/tables/clients";


let id_problem = 0, id = 0;



describe("DB: Table callbacks:", () => {

  before(async ()=>{
    const problem = await problems.create({
      id_theme: null,
      id_employee: null,
      id_answer: null,
      id_specialist: null,
      name: "Починка пк",
      describe: "У клиента сломалась кнопка enter"
    });
    if(!problem)
        return;
    id_problem = problem[0].id
  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.create({
        id_problem: id_problem,
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
        id_problem: id_problem,
        phone: "8346335562254",
        email: "user@gmail.com"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await callbacks.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  

  
  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await callbacks.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });

    after(async ()=>{
      await problems.delete(id_problem);
    });
  }
 });