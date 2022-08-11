import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import pattern from './assets/imgs/pattern.png'
import RegisterForm from './pages/RegisterForm';
import DashboardRoutes from './DashboardRoutes';
import { Login } from './pages/Login';
import { useEffect } from 'react';
import Cookie from 'js-cookie'
function App() {
  // useEffect(() => {
  //   if(!Cookie.get('name') && window.location.href !== 'http://localhost:3000/login'){
  //     window.location.href = "/login"
  //   }
  // },[])
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
