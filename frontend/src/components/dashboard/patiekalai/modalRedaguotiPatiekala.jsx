import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateDishModal = ({ dishId, onClose, initialValues }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || '');
      setRating(initialValues.rating || 0);
      setPrice(initialValues.price || 0);
      setThumbnail(initialValues.thumbnail || '');
      setDescription(initialValues.description || '');
    }
  }, [initialValues]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedDish = {
        name,
        rating,
        price,
        thumbnail,
        description,
      };

      const response = await fetch(`http://localhost:3000/dishes/${dishId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDish),
        credentials: "include"
      });

      if (response.ok) {
        console.log('Dish updated successfully');
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while updating the dish.');
      }
    } catch (err) {
      setError('An error occurred while updating the dish.');
      console.error(err);
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setThumbnail(`/public/images/${data.name}.png`); 
      } else {
        setError('Failed to upload image');
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
      console.error('Error:', error);
    }
  };
  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="thumbnail">
            <Form.Label>Thumbnail</Form.Label>
            <div
              className="thumbnail-container position-relative"
              onClick={handleThumbnailClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img
                src={`http://localhost:3000${thumbnail}`} // Display the thumbnail image here
                alt="Thumbnail"
                className="thumbnail-image img-fluid"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {/* '+' symbol */}
              <div className="position-absolute top-50 start-50 translate-middle">
                <span className="text-white bg-dark rounded-circle p-1">
                  <i className="bi bi-plus-lg"></i>
                </span>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDishModal;
