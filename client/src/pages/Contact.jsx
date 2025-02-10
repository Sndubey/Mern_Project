import { useState } from "react";
import { useAuth } from "../store/auth";

export const Contact = () => {
    const defaultContactForm = {
        username: "",
        email: "",
        message: ""
    }
    
    const [contact, setContact] = useState(defaultContactForm);

    const URL = "http://localhost:5000/api/form/contact";

    const [userData, setUserData] = useState(true);
    const {user} = useAuth();

    if(userData && user){
        setContact({
            username:user.username,
            email:user.email,
            message:"",
        })

        setUserData(false);  // sets false so that after pg refresh it doesnt always set contact var with user data. 
    }

    const handleInput = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
            console.log("response in contact pg: ",response);
            if(response.ok){
                setContact(defaultContactForm);
                console.log("user contact data stored successfully");
            }
            else{
                console.log("error in storing user contact data");
            }
        } catch (error) {
            console.log("contact form error: ",error)
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="images\contactus.png" alt="contact us image" width="500" height="500"></img>
                            </div>

                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Contact Us</h1> <br />

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label><br />
                                        <input type="email" name="email" placeholder="email" id="email" autoComplete="off" required value={contact.email} onChange={handleInput}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="username">Username</label><br />
                                        <input type="text" name="username" placeholder="username" id="username" autoComplete="off" required value={contact.username} onChange={handleInput}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="message">Message</label><br />
                                        <textarea name="message" placeholder="message" id="message" autoComplete="off" required rows="6" value={contact.message} onChange={handleInput}></textarea>
                                    </div> <br />
                                    <button type="submit" className="btn btn-submit" onChange={handleInput}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

                <section className="mb-3">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.6324318821835!2d72.86527857425303!3d19.123774500472855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8242271256d%3A0x25d25b5459f9926a!2sSubhash%20Nagar%2C%20Andheri%20East%2C%20Mumbai%2C%20Maharashtra%20400093!5e0!3m2!1sen!2sin!4v1720433148234!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
            </section>
        </>
    );
}