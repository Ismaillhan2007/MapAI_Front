import { Outlet, Link } from "react-router-dom";

const Layout = ()=>{
    return(
        <>
        <nav className="bg-gray-100 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Главная
                    </Link>
                </li>
            </ul>
        </nav>
        <Outlet />
        </>
    )
};

export default Layout;