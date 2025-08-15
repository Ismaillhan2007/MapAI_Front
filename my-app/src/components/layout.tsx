import { Outlet, Link } from "react-router-dom";
import AI from '../components/AI'
const Layout = ()=>{
    return(
        <>
        <nav className="bg-amber-100 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-black hover:text-black font-mono font-bold">
                        Главная
                    </Link>
                </li>
                <li>
                    <Link to="/Chat"  className="text-black hover:text-black font-mono font-bold">
                        Chat
                    </Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
};

export default Layout;