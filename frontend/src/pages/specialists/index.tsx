import { Separator } from "@/shared/ui/separator";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

import SpecialistAPI from "@/shared/api/specialist";
import SpecialistsList from "@/features/specialistsList";
import SpecialistForm, {SubmitSpecialistType} from "@/features/specialist";
import { SpecialistType } from "@/types";

import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

import Log from "@/entities/log";






function Specialists(){

    const employee = useSelector((state:RootState)=>state.employee);
    const access = useSelector((state:RootState)=>state.user.accessToken);
    const [specialist,setSpecialist] = useState<SpecialistType | null>(null);
    const [defaultValues,setDefaultValues] = useState<SubmitSpecialistType>({
        first_name: "",
        second_name: "",
        middle_name: "",
        phone: "",
        email: "",
        adress: "",
        profession: ""
    });

    const [load,setLoad] = useState<boolean>(false);
    const [log,setLog] = useState<boolean>(false);
    const [reload,setReload] = useState<boolean>(false);

    const get = async(id:number)=>{
        if(id<=0){
            setSpecialist({...defaultValues ,id:-1});
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                phone: "",
                email: "",
                adress: "",
                profession: ""
            });
            return;
        }
        try{
            const newSpecialist = await SpecialistAPI.getById(id);
            if(newSpecialist){
                setDefaultValues({
                    first_name: newSpecialist.first_name,
                    second_name: newSpecialist.second_name,
                    middle_name: newSpecialist.middle_name,
                    phone: newSpecialist.phone,
                    email: newSpecialist.email,
                    adress: newSpecialist.adress,
                    profession: newSpecialist.profession,
                });
            }else{
                setDefaultValues({
                    first_name: "",
                    second_name: "",
                    middle_name: "",
                    phone: "",
                    email: "",
                    adress: "",
                    profession: ""
                });
            }
            setSpecialist(newSpecialist);
        }catch(err){
            setLog(true);
            setSpecialist(null);
        }
    }


    async function onSubmit(value:SubmitSpecialistType) {
        if(!access || !specialist) return;
        setLoad(true);
        try{
            let newSpecialist = null;
            if(specialist.id > 0){
                newSpecialist = await SpecialistAPI.update(access, {
                    id: specialist.id,
                    ...value
                });
            }else{
                newSpecialist = await SpecialistAPI.add(access, {
                    id: -1,
                    ...value
                });
            }
            if(!newSpecialist)
                setLog(true);
            setSpecialist(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                phone: "",
                email: "",
                adress: "",
                profession: ""
            })
        }
    }

    async function onRemove(id:number) {
        if(!access) return;
        setLoad(true);
        try{
            const res = await SpecialistAPI.delete(access, id);
            if(!res)
                setLog(true);
            setSpecialist(null);
            setReload(!reload);
        }catch(err){
            setLog(true);
        }finally{
            setLoad(false);
            setDefaultValues({
                first_name: "",
                second_name: "",
                middle_name: "",
                phone: "",
                email: "",
                adress: "",
                profession: ""
            })
        }
    }

    
    if(!access || !employee.id)
        return(
            <div className="flex justify-center items-center min-h-[90vh]">
                <h1 className="text-2xl">Прежде чем приступить, подождите пока администратор привяжет вас к системе...</h1>
            </div>
        )
    return(
        <div className="flex flex-col  gap-4 mt-8">
            <div className="flex flex-col gap-4 my-12">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                        <h1 className="text-2xl">Специалисты</h1>
                        <Button onClick={()=>get(-1)} className="w-full md:w-[200px]">Добавить нового специалиста</Button>
                    </div>
                    <Separator />
                </div>
                {specialist &&
                    <SpecialistForm onSubmit={onSubmit} onRemove={onRemove} specialist={specialist} load={load} defaultValues={defaultValues}/>
                }
            </div>
            <SpecialistsList callback={get} reload={reload}/>
            {log &&
                <Log name="Ошибка применения данных специалиста" message="Возможно вам следует повторить это позже, или загрузить соответстующие данные..." type="error" callback={()=>setLog(false)}/>
            }
        </div>
    )
}

export default Specialists