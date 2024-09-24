import {NavLink} from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
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
                            <li><NavLink to="/register">Register</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};
