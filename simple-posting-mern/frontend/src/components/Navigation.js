import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
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
          <li>
            <Link to="/u1/places" className="navigation-link">
              My Places
            </Link>
          </li>
          <li>
            <Link to="/places/new" className="navigation-link">
              Add Place
            </Link>
          </li>
          <li>
            <Link to="/logout" className="navigation-link">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {props.children}
    </>
  );
};

export default Navigation;
