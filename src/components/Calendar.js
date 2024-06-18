import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const Calendar = ({ events, updateEvent, deleteEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);

  const formattedEvents = events.map(event => ({
    ...event,
    title: `${event.theme} - ${event.person}`,
    start: new Date(`${event.date}T${event.time}`),
    end: new Date(`${event.date}T${event.time}`),
    allDay: false,
  }));

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <EventModal
          show={modalShow}
          handleClose={handleClose}
          event={selectedEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
      )}
    </>
  );
};

export default Calendar;
