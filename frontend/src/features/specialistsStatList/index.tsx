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




function SpecialistsStatList (props: {reload?: boolean}){

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
          <TableCaption>Статистика специалистов</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ФИО</TableHead>
              <TableHead>Род деятельности</TableHead>
              <TableHead>Всего проблем</TableHead>
              <TableHead>Решенных проблем</TableHead>
              <TableHead>Число используемых тем</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((specialist) => (
              <TableRow key={"specialists_list_stat_"+specialist.id}>
                <TableCell className="font-medium">
                  {specialist.second_name} {specialist.first_name} {specialist.middle_name}
                </TableCell>
                <TableCell>{specialist.profession}</TableCell>
                <TableCell>{specialist.total_assigned_problems}</TableCell>
                <TableCell>{specialist.solved_problems}</TableCell>
                <TableCell>{specialist.assigned_theme_ids ? specialist.assigned_theme_ids.length : 0}</TableCell>
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

export default SpecialistsStatList;
