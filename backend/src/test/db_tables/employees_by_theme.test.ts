import "dotenv/config";
import assert from "assert";
import employees_by_theme from "../../db/tables/employees_by_theme";

import themes from "../../db/tables/themes";
import employyes from "../../db/tables/employees";


let id_employee = 0, id_theme = 0;



describe("DB: Table employees_by_theme:", () => {

  before(async ()=>{
    const employee = await employyes.create({
        first_name: "Лев",
        second_name: "Кашков",
        middle_name: "Фезьович",
        phone:"35254464224",
        email:"wow@email.com",
        post: "Босс"
    });
    if(!employee)
        return;
    id_employee = employee[0].id


    const theme = await themes.create({
        name: "Транспорт"
    });
    if(theme)
        id_theme = theme[0].id;

  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees_by_theme.create({
        id_theme: id_theme,
        id_employee: id_employee
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees_by_theme.update(id_theme,id_employee,{
        id_theme: id_theme,
        id_employee: id_employee
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await employees_by_theme.readAll(id_theme,true,0,0);
    console.log(res);
    assert.equal(!res, false);
  });



  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await employees_by_theme.delete(id_theme,id_employee);
      console.log(res);
      assert.equal(!res, false);
    });

    after(async ()=>{
      await themes.delete(id_theme);
      await employyes.delete(id_employee);
    });
  }
 });