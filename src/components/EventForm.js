import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EventForm = ({ addEvent }) => {
  const [event, setEvent] = useState({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    venue: '',
    theme: '',
    person: ''
  });

  const handleChange = (name, value) => {
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTime = new Date(event.startDate);
    startDateTime.setHours(event.startTime.getHours(), event.startTime.getMinutes());

    const endDateTime = new Date(event.endDate);
    endDateTime.setHours(event.endTime.getHours(), event.endTime.getMinutes());

    if (endDateTime <= startDateTime) {
      toast.error("End date and time must be after start date and time.");
      return;
    }

    if (!event.venue || !event.theme || !event.person) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

    try {
      const response = await axios.post(
        'http://localhost:5000/api/events',
        event,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addEvent(response.data);
      setEvent({
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
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
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <DatePicker
              selected={event.startDate}
              onChange={date => handleChange('startDate', date)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              placeholderText="Select start date"
            />
          </Col>
          <Col md={6}>
            <DatePicker
              selected={event.endDate}
              onChange={date => handleChange('endDate', date)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
              placeholderText="Select end date"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <DatePicker
              selected={event.startTime}
              onChange={date => handleChange('startTime', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="form-control"
              placeholderText="Select start time"
            />
          </Col>
          <Col md={6}>
            <DatePicker
              selected={event.endTime}
              onChange={date => handleChange('endTime', date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="form-control"
              placeholderText="Select end time"
            />
          </Col>
        </Row>
        <TextField
          label="Venue"
          variant="outlined"
          fullWidth
          value={event.venue}
          onChange={(e) => handleChange('venue', e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Theme"
          variant="outlined"
          fullWidth
          value={event.theme}
          onChange={(e) => handleChange('theme', e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Person"
          variant="outlined"
          fullWidth
          value={event.person}
          onChange={(e) => handleChange('person', e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Event
        </Button>
      </form>
    </Container>
  );
};

export default EventForm;
