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


function CallsList (props: {callback: (id:number)=>Promise<void>, reload: boolean}){

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
          <TableCaption>Список звонков</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Номер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Время</TableHead>
              <TableHead>Спам</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((call) => (
              <TableRow key={"calls_list_"+call.id} onClick={()=>{props.callback(call.id)}}>
                <TableCell className="font-medium">{call.phone}</TableCell>
                <TableCell>{new Date(call.date).toLocaleDateString("ru")}</TableCell>
                <TableCell>{call.time}</TableCell>
                <TableCell>{call.is_spam ? "Да" : "Нет"}</TableCell>
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

export default CallsList;
