import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashMain from "./pages/dashboard/dashMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss'
import UserLogin from "./pages/logins/userLogin";
import UserRegister from "./pages/logins/userRegister";
import Main from "./pages/main";
import NaujasPatiekalas from "./components/dashboard/patiekalai/naujasPatiekalas";
import Patiekalai from "./pages/dashboard/sub-sections/patiekalai";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/register" element={<UserRegister/>}/>
          <Route path="/admin/*" element={<DashMain/>}></Route>
            <Route path="/admin/patiekalai" element={<Patiekalai />} />
              <Route path="/admin/patiekalai/naujas" element={<NaujasPatiekalas/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
