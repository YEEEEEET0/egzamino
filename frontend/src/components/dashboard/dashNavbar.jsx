import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const DashNavbar = () => {

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'GET',
                credentials: 'include',
            });

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
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/admin/patiekalai" className='fs-4'>Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto spread">
                            <Nav.Link href="/admin/patiekalai" className='fs-5'>patiekalai</Nav.Link>
                        </Nav>
                        <button type="button" className="btn btn-danger max-80 font-medium" onClick={handleLogout}>Atsijungti</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default DashNavbar;
