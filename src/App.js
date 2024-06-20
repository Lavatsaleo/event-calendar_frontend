import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import AdminDashboard from './components/AdminDashboard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button, Form } from 'react-bootstrap';

const App = () => {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null); // New state to store the role
  const [showAdminDashboard, setShowAdminDashboard] = useState(false); // State to toggle admin dashboard

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setToken(response.data.token);
      setRole(response.data.role); // Set role from response
      setShowLogin(false);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed.");
      console.error('Error logging in:', err);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await axios.post('http://localhost:5000/api/events', event, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents([...events, response.data]);
      toast.success("Event added successfully!");
    } catch (err) {
      toast.error("Failed to add event.");
      console.error('Error adding event:', err);
    }
  };

  const updateEvent = async (updatedEvent) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${updatedEvent.id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.map(event => (event.id === updatedEvent.id ? response.data : event)));
      toast.success("Event updated successfully!");
    } catch (err) {
      toast.error("Failed to update event.");
      console.error('Error updating event:', err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter(event => event.id !== id));
      toast.success("Event deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete event.");
      console.error('Error deleting event:', err);
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Event Calendar</h1>
      <Calendar events={events} updateEvent={updateEvent} deleteEvent={deleteEvent} />
      {token ? (
        <>
          <EventForm addEvent={addEvent} />
          {role === 'admin' && (
            <Button variant="secondary" onClick={() => setShowAdminDashboard(!showAdminDashboard)}>
              Admin Dashboard
            </Button>
          )}
        </>
      ) : (
        <Button variant="primary" onClick={() => setShowLogin(true)}>
          Add Event
        </Button>
      )}

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      {showAdminDashboard && <AdminDashboard token={token} />}
    </div>
  );
};

export default App;
