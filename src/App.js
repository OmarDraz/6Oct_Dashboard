import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import pattern from './assets/imgs/pattern.png'
import RegisterForm from './pages/RegisterForm';
import DashboardRoutes from './DashboardRoutes';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if(!Cookies.get('name'))
    {
      navigate('/')
    }
  },[navigate])
  return (
    <>
    <img alt="pattern" src={pattern} className="pattern" />
      <Router>

        <Routes>
          <Route path="/*" end element={<DashboardRoutes />} />
          <Route path="/login" end element={<Login />} />
          <Route path="/register" end element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
