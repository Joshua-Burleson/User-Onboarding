import React, {useState, useEffect} from 'react';

function Users(props){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([...props.users]);
    },[props.users]);

    return (
        <ul>
            <h1>Users</h1>
            {users.length > 0 && users.map(user => <li>{`Name: ${user.name}, E-Mail: ${user.email}`}</li>)}
        </ul>
    )
}

export default Users;