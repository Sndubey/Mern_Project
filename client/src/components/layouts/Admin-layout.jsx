import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { MdDesignServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {

    const { user, isLoading } = useAuth();
    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(!user.isAdmin){
        return <Navigate to="/"/>
    }

    return (
        <>
            <header className="admin-header">
    <div>
        <nav className="admin-nav">
            <ul>
                <li>
                    <NavLink to="/admin/users"><FaUser /> Users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/contacts"><IoMdContacts /> Contacts</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/services"><MdDesignServices /> Services</NavLink>
                </li>
                <li>
                    <NavLink to="/"><FaHome /> Home</NavLink>
                </li>
            </ul>
        </nav>
    </div>
</header>

            <Outlet />
        </>
    )
}