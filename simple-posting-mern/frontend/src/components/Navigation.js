import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "./Navigation.css";

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
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
              <Link to={`/${userId}/places`} className="navigation-link">
                My Places
              </Link>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <Link to="/place/new" className="navigation-link">
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
          {!auth.isLoggedIn && (
            <li>
              <Link to="/signup" className="navigation-link">
                Signup
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
