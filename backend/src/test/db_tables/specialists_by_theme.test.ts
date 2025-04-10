import "dotenv/config";
import assert from "assert";
import specialists_by_theme from "../../db/tables/specialists_by_theme";

import themes from "../../db/tables/themes";
import specialists from "../../db/tables/specialists";


let id_specialist = 0, id_theme = 0;



describe("DB: Table specialists_by_theme:", () => {

  before(async ()=>{
    const specialist = await specialists.create({
        first_name: "Тагир",
        second_name: "Разенбаум",
        middle_name: "Волондеморфович",
        phone:"44644262453",
        email:"specazaza@email.com",
        adress:"г. Кировск, Ул. Набережная, дом 15",
        profession: "Сисиадмин"
    });
    if(!specialist)
        return;
    id_specialist = specialist[0].id


    const theme = await themes.create({
        name: "Сети"
    });
    if(theme)
        id_theme = theme[0].id;

  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists_by_theme.create({
        id_theme: id_theme,
        id_specialist: id_specialist
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists_by_theme.update(id_theme,id_specialist,{
        id_theme: id_theme,
        id_specialist: id_specialist
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await specialists_by_theme.readAll(id_theme,true,0,0);
    console.log(res);
    assert.equal(!res, false);
  });



  if(process.env.TEST_DB_CLEAR){
    it("Delete row", async () => {
      console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
      const res = await specialists_by_theme.delete(id_theme,id_specialist);
      console.log(res);
      assert.equal(!res, false);
    });

    after(async ()=>{
      await themes.delete(id_theme);
      await specialists.delete(id_specialist);
    });
  }
 });