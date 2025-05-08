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




function ThemesStatList (props: {reload?: boolean}){

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
          <TableCaption>Статистика тем</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Всего проблем</TableHead>
              <TableHead>Уникальных клиентов</TableHead>
              <TableHead>Всего звонков</TableHead>
              <TableHead>Клиентов с решением</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((theme) => (
              <TableRow key={"themes_list_stat_"+theme.id}>
                <TableCell className="font-medium">{theme.id}</TableCell>
                <TableCell>{theme.name}</TableCell>
                <TableCell>{theme.total_problems_in_theme}</TableCell>
                <TableCell>{theme.unique_clients_count}</TableCell>
                <TableCell>{theme.total_calls_count}</TableCell>
                <TableCell>{theme.clients_with_solutions}</TableCell>
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

export default ThemesStatList;
