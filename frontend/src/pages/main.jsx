import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar';

const Main = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('http://localhost:3000/dishes');
                if (response.ok) {
                    const data = await response.json();
                    setDishes(data);
                }
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const userInfoResponse = await fetch('http://localhost:3000/user/info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (userInfoResponse.ok) {
                    const userInfo = await userInfoResponse.json();
                    console.log('User Information:', userInfo);
                    setLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchDishes();
        fetchUserInfo();
    }, []);

    const handleLogin = () => setLoggedIn(true);

    const dummyDish = [{
        _id: 'some_unique_id',
        name: 'Delicious Dish',
        rating: 4,
        price: 12.99,
        thumbnail: 'https://via.placeholder.com/150',
        description: 'This is a tasty dish that will tantalize your taste buds!',
    }];

    const DishCard = ({ dish }) => {
        const [rating, setRating] = useState(dish.rating);
        
        const handleRatingClick = async (id) => {
            console.log(id)
            try {
                const response = await fetch(`http://localhost:3000/orders/increment/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    setRating(dish.rating + 1);
                } else {
                }
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <div key={dish._id} className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                            src={`http://localhost:3000${dish.thumbnail}`}
                            className="img-fluid rounded-start"
                            alt={dish.name}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{dish.name}</h5>
                            <p className="card-text">{dish.description}</p>
                            <p className="card-text">Price: ${dish.price}</p>
                            <div className="rating">
                                <span onClick={() => handleRatingClick(dish._id)}>
                                    {rating === 1 ? (
                                        <i className="bi bi-star-fill star-filled" style={{ color: 'yellow' }}></i>
                                    ) : (
                                        <i className="bi bi-star star-empty" style={{ color: 'yellow' }}></i>
                                    )}
                                    <span className="rating-number">{rating === 1 ? '1' : ''}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <NavbarComponent loggedIn={loggedIn} handleLogin={handleLogin} />
            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {dishes.map((dish) => (
                        <div key={dish._id} className="col">
                            <DishCard dish={dish} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
