import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/users', user);
      setUsers([...users, { ...user, id: response.data.insertId }]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="user-list-container">
      <h1>Lista de Usuarios</h1>
      <UserForm onAddUser={handleAddUser} />
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

const UserForm = ({ onAddUser }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddUser({ nombre, apellido, email });
    setNombre('');
    setApellido('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">Agregar Usuario</button>
    </form>
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

