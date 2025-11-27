
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users/`)
      .then(response => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username
    }

    console.log(user);

    axios.post(`${API_URL}/users/add`, user)
      .then(res => console.log(res.data));

    setUsername('');
  }

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default App;
