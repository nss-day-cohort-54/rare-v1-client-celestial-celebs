import { getAllUsers } from "./usersManager";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UsersList = () => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      getAllUsers().then((users) => setUsers(users));
    }, []);
  
    return (
        <>
            <div>Users</div>
                {users.map((user) => {
                return (
                        <tr>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                        </tr>
                    );
                    })}
        </>
    )
}