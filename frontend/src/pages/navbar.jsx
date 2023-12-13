import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const NavbarComponent = ({ loggedIn, handleLogin }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                handleLogin();
            } else {
                throw new Error('Login failed.');
            }

            setShowModal(false);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            setMessage('There was an error with the login. Please try again.');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'GET',
                credentials: 'include',
            });

            console.log(response)
            if (response.ok) {
                window.location.reload(false);
            } else {
                console.error('Logout failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <h3 className="navbar-brand" href="/">title</h3>
                    <a className="navbar-brand" href="/admin">admin</a>
                    <button className="navbar-toggler" type="button" onClick={() => setShowModal(true)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        {loggedIn ? (
                            <button type="button" onClick={handleLogout} className="btn btn-danger max-80 font-medium">
                                Atsijungti
                            </button>
                        ) : (
                            <button type="button" className="btn btn-primary max-80 font-medium" onClick={() => setShowModal(true)}>
                                Prisijunk
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="E-paštas"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Slaptažodis"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NavbarComponent;
