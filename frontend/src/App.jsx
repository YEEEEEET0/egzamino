import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashMain from "./pages/dashboard/dashMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss'
import Servisai from "./pages/dashboard/sub-sections/servisai";
import Meistrai from "./pages/dashboard/sub-sections/meistrai";
import NaujasServisas from "./components/dashboard/servisai/naujasServisas";
import NaujasMeistras from "./components/dashboard/patiekalai/naujasPatiekalas";
import UserLogin from "./pages/logins/userLogin";
import UserRegister from "./pages/logins/userRegister";
import Main from "./pages/main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/register" element={<UserRegister/>}/>
          <Route path="/admin/*" element={<DashMain/>}></Route>
            <Route path="/admin/patiekalai" element={<Meistrai />} />
              <Route path="/admin/patiekalai/naujas" element={<NaujasMeistras />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
