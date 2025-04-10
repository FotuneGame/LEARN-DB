import { TablesType } from "../types";
import clients from "./clients";
import calls from "./calls";
import problems from "./problems";
import callbacks from "./callbacks";
import employees from "./employees";
import answers from "./answers";
import specialists from "./specialists";
import themes from "./themes";
import answers_by_theme from "./answers_by_theme";
import employees_by_theme from "./employees_by_theme";
import specialists_by_theme from "./specialists_by_theme";
import list_problems_client from "./list_problems_client";



export const tabels:TablesType = {
    clients, 
    calls,
    problems,
    callbacks,
    employees,
    answers,
    specialists,
    themes,
    answers_by_theme,
    employees_by_theme,
    specialists_by_theme,
    list_problems_client
}