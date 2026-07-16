import { Outlet } from "react-router";
import Navbar from '../components/Navbar/Navbar.jsx';


const Layout = () => {
    return (<>
        <Navbar />
        <div className="layout">
            <Outlet />
        </div>
    </>);
};

export default Layout;