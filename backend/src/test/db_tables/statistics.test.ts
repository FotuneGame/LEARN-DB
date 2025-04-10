import "dotenv/config";
import assert from "assert";
import specialists from "../../db/tables/specialists";
import employees from "../../db/tables/employees";
import themes from "../../db/tables/themes";

import problems from "../../db/tables/problems";
import specialists_by_theme from "../../db/tables/specialists_by_theme";
import clients from "../../db/tables/clients";
import calls from "../../db/tables/calls";
import list_problems_client from "../../db/tables/list_problems_client";

let id_problem1 = 0, id_problem2 = 0;
let id_specialist = 0, id_theme = 0;
let id_employee = 0, id_client = 0, id_call = 0;

describe("DB: Statistcis (3 laba):", () => {
    
    before(async()=>{

        //создание специалиста с темой
        const specialist = await specialists.create({
            first_name: "Один",
            second_name: "Одинович",
            middle_name: "Скандинавович",
            phone:"43143542525",
            email:"god@email.com",
            adress:"Норвегия ,г. ЯПЛОХВГЕОГРАФИИ, Ул. СкандинавскийСквад, дом 12",
            profession: "Отец всех"
        });
        if(specialist)
            id_specialist = specialist[0].id;


        const theme = await themes.create({
            name: "Язычество"
        })
        if(theme)
            id_theme = theme[0].id;

        await specialists_by_theme.create({
            id_specialist:id_specialist,
            id_theme: id_theme
        })

        //создание проблем с решением и без (с общей темой)
        const problem1 = await problems.create({
            id_theme: id_theme,
            id_employee: null,
            id_answer: null,
            id_specialist: id_specialist,
            name: "Скандинавский бог",
            describe: "Клиент пытался призвать скандинавского бога но забыл его имя"
        });
        if(problem1)
            id_problem1 = problem1[0].id;


        const problem2 = await problems.create({
            id_theme: id_theme,
            id_employee: null,
            id_answer: null,
            id_specialist: null,
            name: "Призыв одина",
            describe: "У клиента вспомнил имя бога, но не знает как его вызвать"
        });
        if(problem2)
            id_problem2 = problem2[0].id;

        // сотрудник клиент звонок
        const employee = await employees.create({
            first_name: "Акакий",
            second_name: "Акакиевич",
            middle_name: "Мирон",
            phone:"35254464224",
            email:"wow@email.com",
            post: "Уборщик"
        });
        if(employee)
            id_employee = employee[0].id;

        const client = await clients.create({
            id_employee: id_employee,
            first_name: "Миша",
            second_name: "Янов",
            middle_name: "Усталов",
        })
        if(client)
            id_client = client[0].id;

        const call = await calls.create({
            phone: "52352544554",
            date: new Date(), //YYYY-MM-DD
            time: new Date((60*60*60)), //HH:MM:SS
            id_client: id_client,
            is_spam: false,
        })
        if(call)
            id_call = call[0].id;


        //связь клиента и проблемы
        await list_problems_client.create({
            id_client: id_client,
            id_problem: id_problem1,
            is_solve: true,
        });

        await list_problems_client.create({
            id_client: id_client,
            id_problem: id_problem2,
            is_solve: false,
        });

    });

    it("Employees statistics:", async ()=>{
        console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
        const res= await employees.statics();
        console.log(res);
        assert.equal(!res, false);
    })

    it("Themes statistics:", async ()=>{
        console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
        const res= await themes.statics();
        console.log(res);
        assert.equal(!res, false);
    })


    it("Specialists statistics:", async ()=>{
        console.log("[PG sync/auth]: ",process.env.DB_HOST,':',process.env.DB_PORT);
        const res= await specialists.statics();
        console.log(res);
        assert.equal(!res, false);
    })

    if(process.env.TEST_DB_CLEAR){
        after(async()=>{
            await problems.delete(id_problem1);
            await problems.delete(id_problem2);
            await specialists.delete(id_specialist);
            await themes.delete(id_theme);

            await calls.delete(id_call);
            await clients.delete(id_client);
            await employees.delete(id_employee);
        })
    }
});