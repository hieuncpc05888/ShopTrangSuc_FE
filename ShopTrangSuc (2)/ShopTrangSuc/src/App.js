import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './users/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './users/Footer';
import Header from './users/Header';
import Register from './users/Register';
import Login from './users/Login';
import ForgotPassword from './users/ForgotPassword';
import About from './users/About';
import Products from './users/Products';
import Contact from './users/Contact';
import ShoppingCart from './users/ShoppingCart';
import News from './users/News';
import Bill from './users/Bill';
import Dashboard_User from './users/Dashboard_User';
import Dashboard from './admin/Dashboard';
import ProductDetails from './users/ProductDetails';
import Order from './users/Order';
import OrderDetail from './users/OrderDetail';
import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './users/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Các route không có Header và Footer */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/user/dashboard" element={<Dashboard_User />} />

          {/* Routes có Header và Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/news" element={<News />} />
            <Route path="/personal-information" element={<Dashboard_User />} />
            <Route path="/bills" element={<Bill />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
          </Route>

          {/* Route bảo vệ với phân quyền */}
          {/* <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          {<Route element={<ProtectedRoute allowedRole="user" />}>
            <Route path="/user/dashboard" element={<Dashboard_User />} />
          </Route>} */}
        </Routes>
      </Router>
    </div>
  );
}

// Tạo Layout component để bao bọc Header và Footer
const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
