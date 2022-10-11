import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <nav className="navigation">
        <h1>
          <Link className="navigation-title" to="/">
            Post Post
          </Link>
        </h1>
        <ul className="navigation-item">
          <li>
            <Link to="/" className="navigation-link">
              All User
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/u1/places" className="navigation-link">
                My Places
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/places/new" className="navigation-link">
                Add Place
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/logout" className="navigation-link">
                Logout
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/login" className="navigation-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
