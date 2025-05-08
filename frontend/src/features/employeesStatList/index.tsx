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




function EmployeesStatList (props: {reload?: boolean}){

    const [list, setList] = useState<Array<any>>([]);

    useEffect(()=>{
        loadList()
        .then(res => setList(res))
        .catch(err => {
            if(err) setList([]);
        });
    },[props.reload]);

    
    return(
        <Table>
          <TableCaption>Статистика сотрудников</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ФИО</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead>Уникальных клиентов</TableHead>
              <TableHead>Решенные проблемы клиентов</TableHead>
              <TableHead>Всего проблем в обработке</TableHead>
              <TableHead>Решенные проблемы</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((employee) => (
              <TableRow key={"employees_list_stat_"+employee.id}>
                <TableCell className="font-medium">
                  {employee.second_name} {employee.first_name} {employee.middle_name}
                </TableCell>
                <TableCell>{employee.post}</TableCell>
                <TableCell>{employee.total_clients_assigned}</TableCell>
                <TableCell>{employee.clients_with_solved_problems}</TableCell>
                <TableCell>{employee.total_problems_handled }</TableCell>
                <TableCell>{employee.solved_problems }</TableCell>
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

export default EmployeesStatList;
