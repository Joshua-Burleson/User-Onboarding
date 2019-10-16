import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './Form/UserForm';
import UserList from './Users/Users'

function App() {
  const [users, setUsers] = useState([]);

  const handleNewUser = newUser => {
    setUsers([...users, newUser]);
    console.log(newUser,' added to ', users);
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <UserList users={users}/>
        <UserForm handleNewUser={handleNewUser}/>
      </header>
    </div>
  );
}

export default App;
