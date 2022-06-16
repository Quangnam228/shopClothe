import Sidebar from "./componentsAdmin/sidebar/Sidebar";
import TopBar from "./componentsAdmin/topbar/Topbar";
import "./App.css";
import Home from "./pagesAdmin/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pagesAdmin/userList/UserList";
import User from "./pagesAdmin/user/User";
import NewUser from "./pagesAdmin/newUser/NewUser";
import ProductList from "./pagesAdmin/productList/ProductList";
import Product from "./pagesAdmin/product/Product";
import NewProduct from "./pagesAdmin/newProduct/NewProduct";
import Login from "./pagesAdmin/login/Login";
import OrderList from "./pagesAdmin/orderList/OrderList";
import OrderDetail from "./pagesAdmin/orderDetail/OrderDetail";
import Approved from "./pagesAdmin/orderList/Approved";
import ProductReview from "./pagesAdmin/productReview/ProductReview";
import Trash from "./pagesAdmin/Trash/Trash";

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
