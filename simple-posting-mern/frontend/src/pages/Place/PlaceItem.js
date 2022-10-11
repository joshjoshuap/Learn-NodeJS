import { Link } from "react-router-dom";
import "./PlaceItem.css";

const PlaceItem = (props) => {
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
        <Link className="place-actions" to={`/places/${props.id}`}>
          Edit
        </Link>
        <Link className="place-actions" to="/delete">
          Delete
        </Link>
      </div>
    </li>
  );
};

export default PlaceItem;
