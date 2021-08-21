import { BrowserRouter, Route } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import { Link } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import SignInScreen from './Screens/SignInScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddessScreen from './Screens/ShippingAddessScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderDetailsScreen from './Screens/OrderDetailsScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditSceen from './Screens/UserEditSceen';
import SellerRoute from './components/SellerRoute'
import SellerScreen from './Screens/SellerScreen';

function App() {

  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);

  const {cartItems} = cart;
  const {userInfo} = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">E-Shop</Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {cartItems.length > 0 && (
                <span className="badge">
                  {cartItems.length}
                </span>)}
                </Link>
                {
                  userInfo ? (
                    <div className="dropdown">
                    <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                    <ul className="dropdown-content">
                      <li><Link to="/profile"> Profile</Link></li>
                      <li><Link to="/orderhistory">My Orders</Link></li>
                      <li><Link to="#signout" onClick={signoutHandler}>Sign Out</Link></li>
                    </ul>
                    </div>
                  ):(
                    <Link to="/signin">signin</Link>
                  )
                }

                {userInfo && userInfo.isSeller &&  (
                  <div className="dropdown">
                      <Link to="#seller">Seller {''}<i className="fa fa-caret-down"></i> </Link>
                      <ul className="dropdown-content">
                        <li><Link to="/productlist/seller">Products</Link></li>
                        <li><Link to="/orderlist/seller">Orders</Link></li>
                      </ul>
                  </div>
                )}

                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                      <Link to="#admin">Admin {''}<i className="fa fa-caret-down"></i> </Link>
                      <ul className="dropdown-content">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/productlist">Products</Link></li>
                        <li><Link to="/orderlist">Orders</Link></li>
                        <li><Link to="/userlist">Users</Link></li>
                      </ul>
                    </div>
                  )
                } 
            </div>
        </header>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <AdminRoute path="/product/:id/edit" component={ProductEditScreen} exact></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SignInScreen} ></Route>
          <Route path="/register" component={RegisterScreen} ></Route>
          <Route path="/shipping" component={ShippingAddessScreen} ></Route>
          <Route path="/payment" component={PaymentMethodScreen} ></Route>
          <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
          <Route path="/order/:id" component={OrderDetailsScreen} ></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen} ></Route>
          <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditSceen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen} ></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} ></SellerRoute>
        </main>
        <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
