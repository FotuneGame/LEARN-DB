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


function ThemesList (props: {callback: (id:number)=>Promise<void>, reload: boolean}){

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
          <TableCaption>Список тем</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Название</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list ? list.map((theme) => (
              <TableRow key={"themes_list_"+theme.id} onClick={()=>{props.callback(theme.id)}}>
                <TableCell className="font-medium">{theme.id}</TableCell>
                <TableCell>{theme.name}</TableCell>
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

export default ThemesList;
