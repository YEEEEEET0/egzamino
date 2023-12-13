import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpdateDishModal from './modalRedaguotiPatiekala';

const VisiPatiekalai = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  const fetchUpdatedDish = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/dishes/${id}`);
      if (response.ok) {
        const updatedDish = await response.json();
        const updatedDishes = dishes.map((dish) =>
          dish._id === updatedDish._id ? updatedDish : dish
        );
        setDishes(updatedDishes);
      } else {
        setError('Failed to fetch updated dish data');
      }
    } catch (error) {
      setError('An error occurred while fetching updated dish data.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/dishes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setDishes(dishes.filter((dish) => dish._id !== id));
      } else if (response.status === 404) {
        setError('Dish not found');
      } else {
        setError('Failed to delete dish');
      }
    } catch (err) {
      setError('An error occurred while deleting the dish.');
    }
  };

  const openModal = async (id) => {
    setSelectedDish(null);
    try {
      const response = await fetch(`http://localhost:3000/dishes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedDish(data);
        setShowModal(true);
      } else {
        setError('Failed to fetch dish details');
      }
    } catch (error) {
      setError('An error occurred while fetching dish details.');
    }
  };


  const closeModal = () => {
    fetchUpdatedDish(selectedDish._id);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:3000/dishes');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setDishes(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchDishes();
  }, []);

  return (
    <div className='container-xl bg-secondary'>
      <div className="row py-3">
        <div className="col-lg-10 text-center fs-4 text-light">
          Visi patiekalai
        </div>
        <div className="col-lg-2 text-center fs-4">
          <Link to="/admin/patiekalai/naujas">
            <i className="bi bi-plus-circle dark-on-hover text-light"></i>
          </Link>
        </div>
      </div>

      <div className='row fs-4 border-top border-dark'>
        {error ? (
          <div className="col-lg-12">
            Error: {error}
          </div>
        ) : (
          dishes.map((dish) => (
            <div className="row" key={dish.id}>
              <div className="row col-lg-12 border-bottom border-dark py-2">
                <div className="row col-lg-10 ">
                  <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                    {dish.name}
                  </div>
                  <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                    {dish.rating}
                  </div>
                  <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                    {dish.price}
                  </div>
                  <div className="col-lg-2 border border-top-0 border-bottom-0">
                    <img
                      src={`http://localhost:3000${dish.thumbnail}`}
                      alt=""
                      className="img-fluid"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }}
                    />
                  </div>
                  <div className="col-lg-2 border border-top-0 border-bottom-0 ">
                    {dish.description}
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="col-lg-1 opposite py-2" >
                    <i className="bi bi-pencil text-warning dark-on-hover" onClick={() => openModal(dish._id)}></i>
                    <i className="bi bi-x-lg text-danger dark-on-hover fs-3 mx-2" onClick={() => handleDelete(dish._id)}></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && selectedDish && (
        <UpdateDishModal
          dishId={selectedDish._id}
          onClose={closeModal}
          initialValues={selectedDish}
        />
      )}
    </div>
  );
};

export default VisiPatiekalai;
