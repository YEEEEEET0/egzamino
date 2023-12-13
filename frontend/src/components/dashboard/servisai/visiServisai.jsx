import React from 'react';
import { Link } from "react-router-dom";


const visiServisai = () => {
    return (
        <div className='container-xl bg-secondary'>
            <div className="row py-3">
                <div className="col-lg-10 text-center fs-4 text-light">
                    Visi servisai
                </div>
                <div className="col-lg-2 text-center fs-4">
                    <Link to="/admin/servisai/naujas">
                    <i class="bi bi-plus-circle dark-on-hover text-light"></i>
                    </Link>
                </div>
            </div>

            <div className='row fs-4 border-top border-dark'>
                <div className="col-lg-1 border opposite py-2">
                    <i class="bi bi-x-lg text-danger dark-on-hover"></i>
                    <i class="bi bi-pencil text-warning dark-on-hover"></i>
                </div>
                <div className="col-lg-5 border py-2">
                    Pavadinimas
                </div>
                <div className="col-lg-5 border py-2">
                    Miestas
                </div>
                <div className="col-lg-1 py-2 border-bottom border-dark">
                    <button type="button" class="btn btn-success disabled max-80 font-medium">Išsaugoti</button>
                </div>
            </div>

        </div>
    );
};

export default visiServisai;