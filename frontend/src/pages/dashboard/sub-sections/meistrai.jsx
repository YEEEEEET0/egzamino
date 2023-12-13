import React from 'react';
import DashNavbar from '../../../components/dashboard/dashNavbar';
import VisiMeistrai from '../../../components/dashboard/patiekalai/visiPatiekalai';

const meistrai = () => {
    return (
        <div>
            <DashNavbar />
            <VisiMeistrai />
        </div>
    );
};

export default meistrai;