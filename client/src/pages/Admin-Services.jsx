import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

export const AdminServices = () => {

    const [users, setUsers] = useState([]);  //state to store all users data
    const { authorizationToken } = useAuth();  //geting token value from auth.jsx file
    const API = import.meta.env.VITE_APP_URI_API;

    const getAllServicesData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/services`, {
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

    // deleting user on clicking delete button
    const deleteService = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/services/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();

            if (response.ok) {
                getAllServicesData();  //to get updated data after deleting user on frontend.
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getAllServicesData();
    }, []);

    return (
        <>
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>

            <div className="container admin-services">
                <table>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Provider</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{curUser.service}</td>
                                    <td>{curUser.description}</td>
                                    <td>{curUser.price}</td>
                                    <td>{curUser.provider}</td>
                                    <td><Link to={`/admin/services/${curUser._id}/edit`}>Edit</Link></td>
                                    <td><button onClick={() => deleteService(curUser._id)}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}