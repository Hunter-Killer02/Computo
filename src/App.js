import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false); // Estado para controlar la visibilidad del formulario de agregar

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
      setShowAddForm(false); // Ocultar el formulario después de agregar un usuario
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm); // Alternar la visibilidad del formulario de agregar
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className="user-list-container">
      <h1>Lista de Usuarios</h1>
      <button className="toggle-add-form" onClick={toggleAddForm}>
        {showAddForm ? 'Ocultar Formulario' : 'Agregar Usuario'}
      </button>
      {showAddForm && <UserForm onAddUser={handleAddUser} />}
      {editUser && <UserForm user={editUser} onUpdateUser={handleUpdateUser} onCancelEdit={handleCancelEdit} />}
      {users.length > 0 ? (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <h3>{user.nombre}</h3>
              <h3>{user.apellido}</h3>
              <p>{user.email}</p>
              <div className="user-item-buttons">
                <button onClick={() => handleEditClick(user)}>Editar</button>
                <button className="delete" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No hay usuarios disponibles.</div>
      )}
    </div>
  );
};

const UserForm = ({ user, onAddUser, onUpdateUser, onCancelEdit }) => {
  const [nombre, setNombre] = useState(user ? user.nombre : '');
  const [apellido, setApellido] = useState(user ? user.apellido : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user) {
      onUpdateUser(user.id, { nombre, apellido, email });
    } else {
      onAddUser({ nombre, apellido, email });
    }
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
      <div className="form-buttons">
        <button type="submit">{user ? 'Actualizar Usuario' : 'Agregar Usuario'}</button>
        {user && <button type="button" onClick={onCancelEdit}>Cancelar</button>}
      </div>
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