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
            <Link href="/admin/servisai" className='fs-5 mx-2'>Servisai</Link>
            <Link href="/admin/meistrai" className='fs-5 mx-2'>Meistrai</Link>
        </div>
    );
};

export default dashMain;