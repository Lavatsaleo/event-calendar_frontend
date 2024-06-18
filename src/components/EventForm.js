import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(event);
    setEvent({
      date: '',
      time: '',
      venue: '',
      theme: '',
      person: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Date:</label>
      <input type="date" name="date" value={event.date} onChange={handleChange} required />
      
      <label>Time:</label>
      <input type="time" name="time" value={event.time} onChange={handleChange} required />
      
      <label>Venue:</label>
      <input type="text" name="venue" value={event.venue} onChange={handleChange} required />
      
      <label>Theme:</label>
      <input type="text" name="theme" value={event.theme} onChange={handleChange} required />
      
      <label>Person:</label>
      <input type="text" name="person" value={event.person} onChange={handleChange} required />
      
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
