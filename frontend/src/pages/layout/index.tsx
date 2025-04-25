import { Outlet} from "react-router-dom";
import Navbar from "@/widgets/navbar";
import UpButton from "@/shared/ui/upButton";
import Footer from "@/widgets/footer";
import "./ui.css";




function Layout(){
    return(
        <>
            <Navbar />
                <section className="min-h-[100vh]">
                    <Outlet />
                </section>
                <UpButton offset={100}/>
            <Footer />
        </>
    )
}

export default Layout