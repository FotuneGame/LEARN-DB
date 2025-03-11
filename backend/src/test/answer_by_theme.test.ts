import "dotenv/config";
import assert from "assert";
import answers_by_theme from "../db/tables/answers_by_theme";

import themes from "../db/tables/themes";
import answers from "../db/tables/answers";


let id_answers = 0, id_theme = 0;



describe("DB: Table answers_by_theme:", () => {

  before(async ()=>{
    const answer = await answers.create({
        name: "Починка пк",
        describe: "Чтобы починить пк, перезапусти",
        important: "Перезапусти"
    });
    if(!answer)
        return;
    id_answers = answer[0].id


    const theme = await themes.create({
        name: "ПК"
    });
    if(theme)
        id_theme = theme[0].id;

  });



  it("Create row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers_by_theme.create({
        id_theme: id_theme,
        id_answer: id_answers
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers_by_theme.update(id_theme,id_answers,{
        id_theme: id_theme,
        id_answer: id_answers
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("Read row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers_by_theme.read(id_theme,true,0,0);
    console.log(res);
    assert.equal(!res, false);
  });
  it("Delete row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await answers_by_theme.delete(id_theme,id_answers);
    console.log(res);
    assert.equal(!res, false);
  });


  after(async ()=>{
    await themes.delete(id_theme);
    await answers.delete(id_answers);
  });
 });