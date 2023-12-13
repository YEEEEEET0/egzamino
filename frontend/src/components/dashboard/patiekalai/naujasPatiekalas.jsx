import React, { useState } from 'react';
import DashNavbar from '../dashNavbar';

const NaujasPatiekalas = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        thumbnail: '',
        description: ''
    });

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataWithImage = new FormData();
        formDataWithImage.append('image', image);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formDataWithImage,
                credentials: "include"
            });

            const data = await response.json();
            const { name } = data;

            const dishData = {
                name: formData.name,
                price: formData.price,
                thumbnail: `/public/images/${name}.png`, 
                description: formData.description
            };

            const dishResponse = await fetch(`http://localhost:3000/dishes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dishData),
                credentials: "include"
            });

            // Handle dishResponse as needed

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
                <form onSubmit={handleSubmit} className='text-center p-5'>
                    <p className='fs-2'>Add a new dish</p>
                    <div>
                        <input type="text" name="name" placeholder='Name' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="number" name="price" placeholder='Price' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <div>
                        <input type="text" name="description" placeholder='Description' className='my-2' required onChange={handleInputChange} />
                    </div>
                    <p>Thumbnail</p>
                    <input type="file" name="image" accept="image/*" required onChange={handleImageChange} />
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NaujasPatiekalas;
