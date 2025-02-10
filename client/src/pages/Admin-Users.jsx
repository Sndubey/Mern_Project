import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

export const AdminUsers = () => {

    const [users, setUsers] = useState([]);  //state to store all users data
    const { authorizationToken } = useAuth();  //geting token value from auth.jsx file

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
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
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
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
    }, []);  //using empty [] to run getAllUsersData() only once

    return (
        <>
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>

            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                    <td><button onClick={()=> deleteUser(curUser._id) }>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}