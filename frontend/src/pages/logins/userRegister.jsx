import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const UserRegister = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      alert(data.message || data.errorMessage)
      if(data.message){
        navigate('/login')
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className='container-xl bg-secondary text-center pt-5'>
      <form onSubmit={handleSubmit} className='text-center p-5'>
        <p className='fs-2'>Registruotis</p>
        <div>
          <input
            type='text'
            id='vardas'
            name='username'
            placeholder='Vardas'
            className='my-2'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='E-paštas'
            className='my-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type='password'
            id='pass'
            name='password'
            placeholder='Slaptažodis'
            className='my-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input type='submit' value='Submit' className='btn btn-primary my-2' />
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
