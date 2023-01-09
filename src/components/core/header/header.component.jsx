import React, { useContext } from 'react';
import './header.css';
import logo from '../../../assets/nemo.svg';
import { ShoppingCart, SignOut } from 'phosphor-react';
import { UserContext } from '../../providers/user-provider.component';
import { CartContext } from '../../providers/cart-provider.component';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  let totalCartQuantity = 0;

  for (let i = 0; i < cartContext.cart.length; i++) {
    totalCartQuantity += cartContext.cart[i].quantity;
  }

  return (
    <header className="websiteHeader">
      <div className="left">
        <h1>
          <img src={logo} alt="Nemo" />
          Frying Nemo
        </h1>
      </div>
      <div className="right">
        <nav>
          {
            userContext.user ? (
              <Link to="/add" className={location.pathname === "/add" ? 'current' : ''}>
                Add
              </Link>
            ) : (
              <Link to="/login" className={location.pathname === "/login" ? 'current' : ''}>
                Login
              </Link>
            )
          }
          <Link to="/view" className={location.pathname === "/view" ? 'current' : ''}>
            View
          </Link>
        </nav>
        <Link className="cart" to="cart">
          {/* <img src={cartIcon} alt="cart icon" /> */}
          <ShoppingCart size={30} color="#be441d" />
          <span className="count">{totalCartQuantity}</span>
        </Link>
        {
          userContext.user &&
          <span className="user-badge">
            <img src={userContext.user.imageUrl} alt="user logo" width={30} height={30} />
            {userContext.user.fullName}
            <button
              onClick={() => {
                userContext.setUser(null);
                navigate('/login');
              }}
            >
              <SignOut size={24} color="#be441d" weight="fill" />
            </button>
          </span>
        }
      </div>
    </header>
  );
};

export default Header;