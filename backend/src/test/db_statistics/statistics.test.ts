import "dotenv/config";
import assert from "assert";
import specialists from "../../db/tables/specialists";
import employees from "../../db/tables/employees";
import themes from "../../db/tables/themes";

describe("DB: Statistcis (3 laba):", () => {
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
});