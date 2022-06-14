import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import OrderList from "./pages/orderList/OrderList";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import Approved from "./pages/orderList/Approved";
import ProductReview from "./pages/productReview/ProductReview";
import Trash from "./pages/Trash/Trash";

function App() {
  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user
  )?.currentUser?.user?.isAdmin;

  console.log(admin);
  return (
    <Router>
      <Switch>
        {/* <Route path="/login" component={admin ? Home : Login} /> */}
        <Route
          path="/login"
          render={() => (admin ? <Redirect to="/" /> : <Login />)}
        />

        {admin && (
          <>
            <TopBar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/order/:orderId">
                <OrderDetail />
              </Route>
              <Route path="/orders">
                <OrderList />
              </Route>
              <Route path="/delivery">
                <Approved />
              </Route>
              <Route path="/reviewProduct">
                <ProductReview />
              </Route>
              {/* <Route path="/trash">
                <Trash />
              </Route> */}
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
