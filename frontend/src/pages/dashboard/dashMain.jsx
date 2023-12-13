import React, { useEffect } from 'react';
import DashNavbar from '../../components/dashboard/dashNavbar';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';


const dashMain = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('/admin/servisai');
    }, [navigate]);
    return (
        <div>
            <DashNavbar />
        </div>
    );
};

export default dashMain;