import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="user-list-container">
      <h1>Lista de Usuarios</h1>
      {users.length > 0 ? (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <h3>{user.nombre}</h3>
              <h3>{user.apellido}</h3>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay usuarios disponibles.</div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <UserList />
    </div>
  );
};

export default App;




/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

