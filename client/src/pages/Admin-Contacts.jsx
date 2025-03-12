import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

export const AdminContacts = () => {

    const [users, setUsers] = useState([]);  //state to store all users data
    const { authorizationToken } = useAuth();  //geting token value from auth.jsx file
    const API = import.meta.env.VITE_APP_URI_API;

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contacts`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log("user deleted is: ",data);

            if(response.ok){
                getAllUsersData();  //to get updated data after deleting user on frontend.
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <>
            <div className="container">
                <h1>Admin Contacts Data</h1>
            </div>

            <div className="container admin-contacts">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.message}</td>
                                    <td><button onClick={() => deleteContact(curUser._id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}