import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import Calendar from './components/Calendar';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);

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

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <EventForm addEvent={addEvent} />
      <Calendar events={events} updateEvent={updateEvent} deleteEvent={deleteEvent} />
    </div>
  );
};

export default App;
