import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EventModal = ({ show, handleClose, event, updateEvent, deleteEvent }) => {
  const [editableEvent, setEditableEvent] = useState(event);

  useEffect(() => {
    setEditableEvent(event);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEvent({
      ...editableEvent,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${editableEvent.id}`, editableEvent);
      updateEvent(response.data);
      handleClose();
      toast.success("Event updated successfully!");
    } catch (err) {
      console.error('Error updating event:', err);
      toast.error("Failed to update event.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${editableEvent.id}`);
      deleteEvent(editableEvent.id);
      handleClose();
      toast.success("Event deleted successfully!");
    } catch (err) {
      console.error('Error deleting event:', err);
      toast.error("Failed to delete event.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={editableEvent.date} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name="time" value={editableEvent.time} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formVenue">
            <Form.Label>Venue</Form.Label>
            <Form.Control type="text" name="venue" value={editableEvent.venue} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formTheme">
            <Form.Label>Theme</Form.Label>
            <Form.Control type="text" name="theme" value={editableEvent.theme} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPerson">
            <Form.Label>Person</Form.Label>
            <Form.Control type="text" name="person" value={editableEvent.person} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
