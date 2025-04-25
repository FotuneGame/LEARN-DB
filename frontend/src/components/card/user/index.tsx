import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserType } from "@/types";



function UserCard(props: {user:UserType}){
    return(
        <div className="flex items-center gap-4" {...props}>
            <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src={props.user.avatar} />
                <AvatarFallback>А</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-between gap-2">
                <h3 className="text-2xl">{`${props.user.second_name} ${props.user.first_name} ${props.user.middle_name}`}</h3>
                <div className="w-full justify-between gap-1">
                    <p>{`${props.user.email}`}</p>
                    <p>{`${props.user.phone}`}</p>
                </div>
            </div>
        </div>
    );
}

export default UserCard;