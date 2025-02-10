import {NavLink} from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../store/auth';

export const Navbar = () => {
    const {isLoggedIn} = useAuth();  //here isLoggedIn var name should be same as in auth.jsx file.

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Shubham</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>  {/* its like sending req of "/" url */}
                            <li><NavLink to="/about">About</NavLink></li>  {/* this href /about is sent to url bar, and then taken by BrowserRouter (react-router-dom) to serve the element */}
                            <li><NavLink to="/contact">Contact</NavLink></li>
                            <li><NavLink to="/service">Service</NavLink></li>
                            {isLoggedIn? <li><NavLink to="/logout">Logout</NavLink></li> : (<>
                                <li><NavLink to="/register">Register</NavLink></li>
                                <li><NavLink to="/login">Login</NavLink></li> 
                                </>
                            )}  {/* using terniary operator, if there is token (user logged in) then show Logout else show register and login */}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};
