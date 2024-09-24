import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Register = () => {
    const [user, setuser] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const navigate = useNavigate();
    const URL = "http://localhost:5000/api/auth/register";

    const {storetokenInLS} = useAuth();

    const handleInput = (e) => {
        const name = e.target.name;  // name var contains the name attribute of input tag, like which input tag is focused/targeted, eg: username, phone etc. (if we enter phone then name var will store phone)
        const value = e.target.value; // value var contains the value of input tag, like which value/data is entered in input tag, eg: 1234567890 (phone no).
        setuser({ ...user, [name]: value }); // "...user" (spread operator) due to this previous data remains as it is, "[name]: value" data is updated of only updated value.
    }

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default behavior of a form submission, When a form is submitted, the browser will not automatically reload the page, you can then take control of the event handling and perform custom actions instead.
        console.log(user);

        //sending frontend data to db
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {  // if data successfully sended to db then empty the input field.
                const res_data = await response.json();
                console.log(res_data);
                storetokenInLS(res_data.token);
                setuser({
                    username: '', email: '', phone: '', password: ''
                })
                navigate('/login');  //if reg. successful then send user to login page.
            }
            else{
                alert("Invalid Credentials");
                console.log("Invalid credentials");
            }
            
            console.log(response);
        } catch (error) {
            console.log("register error", error);
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="images\register.png" alt="registration image" width="500" height="500"></img>
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1> <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label><br />
                                        <input type="text" name="username" placeholder="username" id="username" autoComplete="off" required value={user.username} onChange={handleInput}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label><br />
                                        <input type="email" name="email" placeholder="email" id="email" autoComplete="off" required value={user.email} onChange={handleInput}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label><br />
                                        <input type="number" name="phone" placeholder="phone" id="phone" autoComplete="off" required value={user.phone} onChange={handleInput}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label><br />
                                        <input type="password" name="password" placeholder="password" id="password" autoComplete="off" required value={user.password} onChange={handleInput}></input>
                                    </div> <br />
                                    <button type="submit" className="btn btn-submit" onChange={handleInput}>Register now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
}