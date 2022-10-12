import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <li className="place-item-card">
      <div className="place-image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="place-info">
        <h2>{props.title}</h2>
        <h2>{props.address}</h2>
        <p>{props.description}</p>
      </div>
      <div>
        {auth.isLoggedIn && (
          <Link className="place-actions" to={`/places/${props.id}`}>
            Edit
          </Link>
        )}
        {auth.isLoggedIn && (
          <Link className="place-actions" to="/delete">
            Delete
          </Link>
        )}
      </div>
    </li>
  );
};

export default PlaceItem;
