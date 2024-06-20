import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button } from 'react-bootstrap';

const AdminDashboard = ({ token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/add', { username, password, role }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User added successfully!");
      setUsername('');
      setPassword('');
      setRole('user');
    } catch (err) {
      toast.error("Failed to add user.");
      console.error('Error adding user:', err);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Admin Dashboard</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={addUser}>
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AdminDashboard;
