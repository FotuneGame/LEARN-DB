import "dotenv/config";
import assert from "assert";
import employees from "../../db/tables/employees";



let id = 0;



describe("DB: Table employees:", () => {
  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees.create({
        first_name: "Витя",
        second_name: "Кашков",
        middle_name: "Ильич",
        phone:"89533496109",
        email:"some@email.com",
        post: "Разнорабочий"
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees.update(id,{
        first_name: "Витя",
        second_name: "Кашков",
        middle_name: "Ильич",
        phone:"89533496109",
        email:"some@email.com",
        post: "Разнорабочий"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });


  
  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await employees.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });
  }
 });