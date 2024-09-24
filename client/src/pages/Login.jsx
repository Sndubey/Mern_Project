import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {
    const [user, setuser] = useState({
        email: "",
        password: ""
    });

    const Navigate = useNavigate();
    const URL = "http://localhost:5000/api/auth/login";

    const {storetokenInLS} = useAuth();

    const handleInput = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            const response = await fetch(URL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)  // conserting object to json.
            })
            if(response.ok){
                const res_data = await response.json();
                storetokenInLS(res_data.token);
                setuser({email: "", password: ""})
                Navigate('/');
            }
            else{
                alert("Invalid Credentials");
                console.log("Invalid credentials");
            }
            
            console.log(response);
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
                                    <button type="submit" className="btn btn-submit" onChange={handleInput}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}