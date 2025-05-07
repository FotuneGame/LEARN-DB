import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/shared/ui/pagination";
import { useEffect, useState } from "react";
import {loadList} from "./api";


function SpecialistsList (props: {callback: (id:number)=>Promise<void>, reload: boolean}){

    const [offset,setOffset] = useState(0);
    const [limit] = useState(10);
    const [list, setList] = useState<Array<any>>([]);

    useEffect(()=>{
        loadList(limit, offset)
        .then(res => setList(res))
        .catch(err => {
            if(err) setList([]);
        });
    },[limit, offset, props.reload]);

    
    return(
        <>
        <Table>
          <TableCaption>Список специалистов</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ФИО</TableHead>
              <TableHead>Род деятельности</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Почта</TableHead>
              <TableHead>Адресс</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((specialist) => (
              <TableRow key={"specialists_list_"+specialist.id} onClick={()=>{props.callback(specialist.id)}}>
                <TableCell className="font-medium">{specialist.second_name} {specialist.first_name} {specialist.middle_name}</TableCell>
                <TableCell>{specialist.profession}</TableCell>
                <TableCell>{specialist.phone}</TableCell>
                <TableCell>{specialist.email}</TableCell>
                <TableCell>{specialist.adress}</TableCell>
              </TableRow>
            )) :
              <TableRow> 
                <TableCell>Пусто</TableCell>
              </TableRow>
            }
          </TableBody>
      </Table>
      {list &&
          <Pagination>
              <PaginationContent>
                  { offset > 0 &&
                      <PaginationItem>
                          <PaginationPrevious onClick={()=>{setOffset(state => state - limit)}}/>
                      </PaginationItem>
                  }
                  { list.length===limit &&
                  <PaginationItem>
                      <PaginationNext onClick={()=>setOffset(state => state + limit)} />
                  </PaginationItem>
                  }
              </PaginationContent>
          </Pagination>
        }
        </>
    );
}

export default SpecialistsList;
