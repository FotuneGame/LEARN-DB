import "dotenv/config";
import assert from "assert";
import specialists from "../../db/tables/specialists";



let id = 0;



describe("DB: Table specialists:", () => {
  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists.create({
        first_name: "Леха",
        second_name: "Газанов",
        middle_name: "Петров",
        phone:"89533496109",
        email:"some@email.com",
        adress:"Ул. Пшкина, дом Колотушкина",
        profession: "Батюшка"
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists.update(id,{
        first_name: "АЛЕКСЕЙ",
        second_name: "Газанов",
        middle_name: "Петров",
        phone:"89533496109",
        email:"some@email.com",
        adress:"Ул. Пшкина, дом Колотушкина",
        profession: "Батюшка"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });


  
  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await specialists.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });
  }
 });