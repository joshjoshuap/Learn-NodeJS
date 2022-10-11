import Button from "../../components/Button";
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
      <div className="place-actions">
        <Button>View Map</Button>
        <Button to={`/places${props.id}`}>Edit</Button>
        <Button>Delete</Button>
      </div>
    </li>
  );
};

export default PlaceItem;
