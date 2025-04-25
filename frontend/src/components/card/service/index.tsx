import {Card, CardContent, CardHeader, CardDescription, CardFooter} from "@/components/ui/card"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";




interface ServiceCardProps extends React.HTMLAttributes<HTMLElement> {
    header: string,
    description:string,
    url: string
}


function ServiceCard(props: ServiceCardProps){
    return(
        <Card className={props.className}>
            <CardHeader className="text-xl">
                {props.header}
            </CardHeader>
            <CardDescription className="px-6">
                {props.description}
            </CardDescription>
            <CardFooter>
                <Link to={props.url}>
                    <Button>Подробнее</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default ServiceCard;