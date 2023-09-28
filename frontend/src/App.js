import { useEffect, useState } from "react";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              {stripeApiKey && (
                <Route path="/process/payment" element={<Payment />} />
              )}
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
            </>
          )}
          {/* protected routes for admin */}
          {isAuthenticated && user.role === "admin" && (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </>
          )}
          {/* Handle redirection for unauthenticated users */}
          {isAuthenticated === false && (
            <>
              <Route path={"/account"} element={<Navigate to="/login" />} />
              <Route path="/me/update" element={<Navigate to="/login" />} />
              <Route
                path="/password/update"
                element={<Navigate to="/login" />}
              />
              <Route path="/shipping" element={<Navigate to="/login" />} />
              <Route path="/order/confirm" element={<Navigate to="/login" />} />
              <Route
                path="/process/payment"
                element={<Navigate to="/login" />}
              />
              <Route path="/success" element={<Navigate to="/login" />} />
              <Route path="/orders" element={<Navigate to="/login" />} />
              <Route path="/order/:id" element={<Navigate to="/login" />} />
              <Route
                path="/admin/dashboard"
                element={<Navigate to="/login" />}
              />
              <Route
                path="/admin/products"
                element={<Navigate to="/login" />}
              />
              <Route path="/admin/product" element={<Navigate to="/login" />} />
              <Route
                path="/admin/product/:id"
                element={<Navigate to="/login" />}
              />
              <Route path="/admin/orders" element={<Navigate to="/login" />} />
              <Route
                path="/admin/order/:id"
                element={<Navigate to="/login" />}
              />
              <Route path="/admin/users" element={<Navigate to="/login" />} />
              <Route
                path="/admin/user/:id"
                element={<Navigate to="/login" />}
              />
              <Route path="/admin/reviews" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Elements>
    </Router>
  );
}

export default App;
