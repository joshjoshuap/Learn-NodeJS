import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./Navigation.css";

const Navigation = (props) => {
  const auth = useContext(AuthContext);

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
          {auth.isLoggedIn && (
            <li>
              <Link to="/u1/places" className="navigation-link">
                My Places
              </Link>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <Link to="/places/new" className="navigation-link">
                Add Place
              </Link>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <Link to="/logout" className="navigation-link">
                Login
              </Link>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
