import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const ServiceUpdate = () => {
    const [data, setData] = useState({
        service: "",
        description: "",
        price: "",
        provider: "",
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    // Get single user data
    const getSingleUserData = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/services/${params.id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                }
            );
            const result = await response.json();
            console.log("single user data: ", result);
            setData(result);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/services/update/${params.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authorizationToken,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (response.ok) {
                toast.success("User updated successfully");
            } else {
                toast.error("User not updated");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            <section className="section-contact">
                <div className="contact-content container">
                    <h1 className="main-heading">Update User Data</h1>
                </div>

                <div className="container grid grid-two-cols">
                    <section className="section-update-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="service">Username: </label>
                                <input
                                    type="text"
                                    name="service"
                                    id="service"
                                    autoComplete="off"
                                    value={data.service}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Email: </label>
                                <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    autoComplete="off"
                                    value={data.description}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="price">Mobile: </label>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    autoComplete="off"
                                    value={data.price}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="provider">Mobile: </label>
                                <input
                                    type="text"
                                    name="provider"
                                    id="provider"
                                    autoComplete="off"
                                    value={data.provider}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    );
};
