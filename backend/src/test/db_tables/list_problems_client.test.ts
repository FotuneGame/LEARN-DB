import "dotenv/config";
import assert from "assert";
import listProblemsClient from "../../db/tables/list_problems_client";

import employees from "../../db/tables/employees";
import clients from "../../db/tables/clients";
import calls from "../../db/tables/calls";

import problems from "../../db/tables/problems";
import callbacks from "../../db/tables/callbacks";
import themes from "../../db/tables/themes";
import answerByTheme from "../../db/tables/answers_by_theme"
import answers from "../../db/tables/answers";




let id1 = 0, id2 = 0;
let id_employee = 0, id_client = 0, id_call = 0;
let id_problem1 = 0, id_problem2 = 0, id_theme = 0, id_answer = 0, id_callback1 = 0, id_callback2 = 0;



describe("DB: Table list_problems_client:", () => {

  before(async()=>{

        //Клиент и все данные для него
        const employee = await employees.create({
            first_name: "Алексей",
            second_name: "Фомович",
            middle_name: "Богович",
            phone:"423235671",
            email:"god@email.com",
            post: "Бог Разнорабочих"
        });
        if(employee)
            id_employee = employee[0].id

        const client = await clients.create({
                id_employee: id_employee,
                first_name: "Костя",
                second_name: "Викторович",
                middle_name: "Жуков",
            });
        if(!client)
            return;
        id_client = client[0].id

        const call = await calls.create({
                phone: "89534133452",
                date: new Date(), //YYYY-MM-DD
                time: new Date((60*60*60)), //HH:MM:SS
                id_client: id_client,
                is_spam: false,
            });
        if(!call)
            return;
        id_call = call[0].id
        

        //Проблемы
        const answer = await answers.create({
            name: "Починка машины",
            describe: "Включить подсосик для воздушного фильтра. Затем завести.",
            important: "Включить подсосик"
        });
        if(!answer)
            return;
        id_answer = answer[0].id
    
    
        const theme = await themes.create({
            name: "Автомобили"
        });
        if(theme)
            id_theme = theme[0].id;

        const answer_by_theme = await answerByTheme.create({
            id_answer:id_answer,
            id_theme:id_theme
        })

        const problem1 = await problems.create({
            id_theme: null,
            id_employee: null,
            id_answer: null,
            id_specialist: null,
            name: "Упал в лужу",
            describe: "У клиента упал в лужу. В него стреляли..."
        });
        if(problem1)
            id_problem1 = problem1[0].id;

        const callback1 = await callbacks.create({
            id_problem: id_problem1,
            phone: "24145513431411",
            email: "user@gmail.com"
        })
        if(callback1)
            id_callback1 = callback1[0].id;

        const problem2 = await problems.create({
            id_theme: id_theme,
            id_employee: null,
            id_answer: id_answer,
            id_specialist: null,
            name: "Не заводиться жига",
            describe: "У клиента не заводиться жигули"
        });
        if(problem2)
            id_problem2 = problem2[0].id;

        const callback2 = await callbacks.create({
            id_problem: id_problem2,
            phone: "24145513431411",
            email: "user_other@gmail.com"
        })
        if(callback2)
            id_callback2 = callback2[0].id;
  })

  


  it("Create row 1", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await listProblemsClient.create({
        id_client: id_client,
        id_problem: id_problem1,
        is_solve: false
    });
    console.log(res);
    if(res)
      id1 = res[0].id;
    assert.equal(!res, false);
  });

  it("Create row 2", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await listProblemsClient.create({
        id_client: id_client,
        id_problem: id_problem2,
        is_solve: false
    });
    console.log(res);
    if(res)
      id2 = res[0].id;
    assert.equal(!res, false);
  });

  it("Update row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res =  await listProblemsClient.update(id_client, id_problem2, {
        id_client: id_client,
        id_problem: id_problem2,
        is_solve: true
    });
    console.log(res);
    assert.equal(!res, false);
  });
  it("ReadAll row", async () => {
    console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
    const res = await listProblemsClient.readAll(id_client,true,0,0);
    console.log(res);
    assert.equal(!res, false);
  });

  

  if(process.env.TEST_DB_CLEAR){
    it("Delete row 1", async () => {
        console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
        const res = await listProblemsClient.delete(id_client,id_problem1);
        console.log(res);
        assert.equal(!res, false);
    });
    it("Delete row 2", async () => {
        console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
        const res = await listProblemsClient.delete(id_client,id_problem2);
        console.log(res);
        assert.equal(!res, false);
    });


    after(async()=>{
        //await answerByTheme.delete(id_theme,id_answer); // каскадное удаление
        await callbacks.delete(id_callback2);
        await problems.delete(id_problem2);
        await answers.delete(id_answer);
        await themes.delete(id_theme);
        await callbacks.delete(id_callback1);
        await problems.delete(id_problem1);

        await calls.delete(id_call);
        await clients.delete(id_client);
        await employees.delete(id_employee);
    })
  }
 });