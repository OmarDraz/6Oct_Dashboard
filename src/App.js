import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import pattern from './assets/imgs/pattern.png'
import RegisterForm from './pages/RegisterForm';
import DashboardRoutes from './DashboardRoutes';
import { Login } from './pages/Login';
function App() {

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
