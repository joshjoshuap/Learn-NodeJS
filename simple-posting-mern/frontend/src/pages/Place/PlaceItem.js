import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/Button";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = auth.userId;

  const placeId = props.id; // place id from props

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/places/${placeId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      // if response is not ok or fetch failed
      if (!res.ok) {
        throw new Error(data.message);
      }

      navigate("/");
    } catch (err) {
      console.log("Delete falied", err);
    }
  };

  return (
    <li className="place-item-card">
      <div className="place-image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="place-info">
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.description}</p>
      </div>
      <div>
        {auth.isLoggedIn && userId === props.creatorId && (
          <Link className="place-actions" to={`/places/${props.id}`}>
            Edit
          </Link>
        )}
        {auth.isLoggedIn && userId === props.creatorId && (
          <form onSubmit={formSubmitHandler}>
            <Button type="submit" className="place-actions" name="Delete" />
          </form>
        )}
      </div>
    </li>
  );
};

export default PlaceItem;
