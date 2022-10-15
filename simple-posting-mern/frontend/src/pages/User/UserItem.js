import { NavLink } from "react-router-dom";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__content">
        <NavLink className='user-link' to={`/${props.id}/places`}>
          <img
            className="user-item__image"
            src={props.image}
            alt={props.name}
          />
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount.length} {props.placeCount.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </NavLink>
      </div>
    </li>
  );
};

export default UserItem;
