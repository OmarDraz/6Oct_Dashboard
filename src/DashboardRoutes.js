import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import Menu from './pages/Menu/Menu';
import Users from './pages/Users';
import AddProduct from './pages/Menu/AddProduct';
import AddCategory from './pages/Menu/AddCategory';
import Categories from './pages/Menu/Categories';
import Products from './pages/Menu/Products';
import EditProduct from './pages/Menu/EditProduct';
import WelcomeMedia from './pages/WelcomeMedia';

const DashboardRoutes = () => {
  return (
    <>
    <div style={{ display: 'flex' }}>
        <Sidebar/>
        <div style={{  width: '100%', margin: '50px 50px' }}>
        <Routes>
        <Route path="/" end element={<Home />} />
        <Route path='menu' end element={<Menu />}/>
        <Route path='menu/add_product' end element={<AddProduct />} />
        <Route path='menu/edit_product/:id' end element={<EditProduct />} />
        <Route path='menu/add_category' end element={<AddCategory />} />
        <Route path='menu/categories' end element={<Categories />} />
        <Route path='menu/products/category/:id' end element={<Products />} />
        <Route path='/users' end element={<Users />} />
        <Route path='/attendance' end element={<Attendance />} />
        <Route path="/welcome_media" end element={<WelcomeMedia />} />
        </Routes>
        </div>
    </div>
  </>
  )
}

export default DashboardRoutes