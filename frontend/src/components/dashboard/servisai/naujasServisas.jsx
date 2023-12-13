import React from 'react';
import DashNavbar from '../dashNavbar';

const naujasServisas = () => {
    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
            <form action="/submit_servisas" method="post" className='text-center p-5'>
                <p className='fs-2'>Pridėti naują servisą</p>
                <div>
                  <input type="text" id="pavadinimas" name="pavadinimas" placeholder='Pavadinimas' className='my-2' required/>
                </div>
                <div>
                  <input type="text" id="miestas" name="miestas" placeholder='Miestas' className='my-2' required/>
                </div>
                <div>
                  <input type="submit" value="Submit"/>
                </div>
              </form>
            </div>
        </div>
    );
};

export default naujasServisas;