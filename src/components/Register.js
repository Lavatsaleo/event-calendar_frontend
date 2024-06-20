import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      toast.success("Registration successful!");
      setUser({ username: '', password: '' });
    } catch (err) {
      toast.error("Registration failed.");
      console.error('Error registering user:', err);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={user.username} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={user.password} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
