import "dotenv/config";
import assert from "assert";
import findByTheme from "../../db/functions/find_by_theme";
import findProblemsByEmployee from "../../db/functions/find_problems_by_employee";


 //работает после заполненой тестовыми данными таблицой
describe("DB: Functions:", () => {

  it("findByTheme", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findByTheme.call(1);
    console.log(res);
    if(res)
      console.log("answers more: ", res[0].answers)
    assert.equal(!res, false);
  });

  //id 5-6 for test
  it("findProblemsByEmployee", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res= await findProblemsByEmployee.call(6);
    console.log(res);
    if(res)
      console.log("problems more: ", res[0].problems)
    assert.equal(!res, false);
  });


 });
 