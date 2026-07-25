import { Outlet } from "react-router";
import Navbar from '../components/Navbar/Navbar.jsx';


const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;