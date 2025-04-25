import { Outlet} from "react-router-dom";
import Navbar from "@/components/navbar";
import UpButton from "@/components/upButton";
import Footer from "@/components/footer";
import "./App.css";




function App(){
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

export default App