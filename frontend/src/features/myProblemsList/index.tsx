import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { useEffect, useState } from "react";
import {loadList} from "./api";

import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";

function MyProblemsList (props: {callback: (id:number)=>Promise<void>, reload: boolean}){

    const id = useSelector( (state:RootState)=> state.employee.id );
    const [list, setList] = useState<Array<any>>([]);

    useEffect(()=>{
        if(id>0){
          loadList(id)
          .then(res => setList(res))
          .catch(err => {
              if(err) setList([]);
          });
        }
    },[id, props.reload]);

    
    return(
        <Table>
          <TableCaption>Список проблем моих клиентов</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Название</TableHead>
              <TableHead>Тема</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Решена</TableHead>
              <TableHead>Способ решения</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list && list.length ? list.map((problem) => (
              <TableRow key={"my_problems_list_"+problem.id_problem} onClick={()=>{props.callback(problem.id_problem)}}>
                <TableCell className="font-medium">{problem.name}</TableCell>
                <TableCell>{problem.theme_name}</TableCell>
                <TableCell>{problem.description}</TableCell>
                <TableCell>{problem.is_solve ? "Да" : "Нет"}</TableCell>
                <TableCell>{problem.solution ? 
                (problem.solution.id_answer ? "Ответ" : (
                problem.solution.id_employee ? "Сотрудником" : "Специалистом"
                ))
                : "Нет"}</TableCell>
              </TableRow>
            )) :
              <TableRow> 
                <TableCell>Пусто</TableCell>
              </TableRow>
            }
          </TableBody>
      </Table>
    );
}

export default MyProblemsList;
