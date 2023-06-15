import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

function Header() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img
            src="https://img.freepik.com/free-vector/airplane-navigator-pointer-logo-icon-negative-space-style_126523-765.jpg?w=1060&t=st=1686267613~exp=1686268213~hmac=e80d7936aa3d0fa23a6333ad3db9a98f9ae32e7f7df55eb71b71152c2bd420c7"
            alt="Airline Carrier Logo"
            className="header__logo-image"
          />
        </Link>
        <nav className="header__nav">
          <ul className="header__menu">
            <li className="header__menu-item">
              <Link to="/" className="header__menu-link">
                Home
              </Link>
            </li>
            <li className="header__menu-item">
              <Link to="/news" className="header__menu-link">
                News
              </Link>
            </li>
            <li className="header__menu-item">
              <Link to="/products" className="header__menu-link">
                Flights
              </Link>
            </li>
            {Object.keys(userData).length ? (
              <>
                <li className="header__menu-item">
                  <Link to="/user" className="header__menu-link">
                    {userData.username}
                  </Link>
                </li>
                <li className="header__menu-item">
                  <Link to="/cart" className="header__menu-link">
                    My Flights
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="header__menu-item">
                  <Link to="/login" className="header__menu-link">
                    Login
                  </Link>
                </li>
                <li className="header__menu-item">
                  <Link to="/registration" className="header__menu-link">
                    Registration
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
