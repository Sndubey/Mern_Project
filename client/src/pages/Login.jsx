import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [user, setuser] = useState({
        email: "",
        password: ""
    });

    const API = import.meta.env.VITE_APP_URI_API;

    const navigate = useNavigate();
    const URL = `${API}/api/auth/login`;

    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)  // conserting object to json.
            })
            const res_data = await response.json();
            if(response.ok){
                storeTokenInLS(res_data.token);
                setuser({email: "", password: ""});
                toast.success("Login Successfull");
                navigate("/");
            }
            else{
                toast.error("Invalid Credentials");
                console.log("Invalid credentials");
            }
            
        } catch (error) {
            console.log("login error", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="images\login.png" alt="registration image" width="500" height="500"></img>
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1> <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label><br />
                                        <input type="email" name="email" placeholder="email" id="email" autoComplete="off" required value={user.email} onChange={handleInput}></input>
                                    </div> 
                                    <div>
                                        <label htmlFor="password">Password</label><br />
                                        <input type="password" name="password" placeholder="password" id="password" autoComplete="off" required value={user.password} onChange={handleInput}></input>
                                    </div> <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}

// login: email: shivam@gmail.com, password: shivam123
// admin login: email: shubham@gmail.com, password: shub1234