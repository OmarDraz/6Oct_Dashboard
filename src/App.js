import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import Menu from './pages/Menu/Menu';
import Users from './pages/Users';
import pattern from './assets/imgs/pattern.png'
import AddProduct from './pages/Menu/AddProduct';
import AddCategory from './pages/Menu/AddCategory';
import Categories from './pages/Menu/Categories';
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
