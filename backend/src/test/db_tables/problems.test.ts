import "dotenv/config";
import assert from "assert";
import problems from "../../db/tables/problems";



let id = 0;



describe("DB: Table problems:", () => {


  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await problems.create({
        id_theme: null,
        id_employee: null,
        id_answer: null,
        id_specialist: null,
        name: "Поливка цветов",
        describe: "У клиента завях подсолнух"
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });

  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await problems.update(id,{
        id_theme: null,
        id_employee: null,
        id_answer: null,
        id_specialist: null,
        name: "Гибель растения",
        describe: "У клиента завях подсолнух"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await problems.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await problems.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  


  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await problems.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });
  }
 });