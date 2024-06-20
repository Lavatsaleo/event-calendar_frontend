import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EventForm = ({ addEvent }) => {
  const [event, setEvent] = useState({
    date: '',
    time: '',
    venue: '',
    theme: '',
    person: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/events', event);
      addEvent(response.data);
      setEvent({
        date: '',
        time: '',
        venue: '',
        theme: '',
        person: ''
      });
      toast.success("Event added successfully!");
    } catch (err) {
      console.error('Error adding event:', err);
      toast.error("Failed to add event.");
    }
  };

  return (
    <Container>
      <h2>Add Event</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" value={event.date} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" value={event.time} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formVenue">
          <Form.Label>Venue</Form.Label>
          <Form.Control type="text" name="venue" value={event.venue} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formTheme">
          <Form.Label>Theme</Form.Label>
          <Form.Control type="text" name="theme" value={event.theme} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="formPerson">
          <Form.Label>Person</Form.Label>
          <Form.Control type="text" name="person" value={event.person} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Event
        </Button>
      </Form>
    </Container>
  );
};

export default EventForm;
