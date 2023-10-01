import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { User } from "../types/user";

export default function Layout({children, user}: {children: React.ReactNode, user: User}) {
    return (
        <>
        <Nav user={user}/>
        <div className="min-h-screen">
            {children}
        </div>
        <Footer/>
        </>
    )

}