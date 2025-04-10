import "dotenv/config";
import assert from "assert";
import answers from "../../db/tables/answers";



let id = 0;



describe("DB: Table answer:", () => {
  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers.create({
        name: "Починка ботинка",
        describe: "Чтобы починить ботинок, возьмите клей и склейте разрез...",
        important: "Разрез = клей"
    });
    console.log(res);
    if(res)
      id = res[0].id;
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers.update(id,{
        name: "Починка ботинка от разреза",
        describe: "Чтобы починить ботинок, возьмите клей и склейте разрез...",
        important: "Разрез = клей"
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers.read(id);
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers.readAll(false,id,0);
    console.log(res);
    assert.equal(!res, false);
  });
  


  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await answers.delete(id);
      console.log(res);
      assert.equal(!res, false);
    });
  }
 });