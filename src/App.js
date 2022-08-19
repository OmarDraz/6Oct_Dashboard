import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import pattern from './assets/imgs/pattern.png'
import RegisterForm from './pages/RegisterForm';
import DashboardRoutes from './DashboardRoutes';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import Cookie from 'js-cookie'
import Logout from './components/logout';
import Welcome from './pages/Welcome';
function App() {
  useEffect(() => {
    if(!Cookie.get('name') && window.location.href !== `${process.env.REACT_APP_DOMAIN}/login`){
      window.location.href = "/login"
        }
  },[])
  return (
    <>
    <img alt="pattern" src={pattern} className="pattern" />
      <Router>

        <Routes>
          <Route path="/*" end element={<DashboardRoutes />} />
          <Route path="/login" end element={<Login />} />
          <Route path="/logout" end element={<Logout />} />
          <Route path="/register" end element={<RegisterForm />} />
          <Route path="/welcome" end element={<Welcome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
