import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/Button";
import "./AddPlace.css";

const AddPlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const titleChangeHandler = (event) => {
    setInputTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  const addressChangeHandler = (event) => {
    setInputAddress(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/places/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: inputTitle,
          description: inputDescription,
          address: inputAddress,
          creator: auth.userId, // get the user id using context
        }),
      });

      const data = await res.json();

      // if response is not ok or fetch failed
      if (!res.ok) {
        // setIsLoading(false);
        throw new Error(data.message);
      }

      navigate("/");
    } catch (err) {
      console.log("Creating Failed", err);
      // setError(err.message);
      // setIsLoading(false);
    }
  };

  return (
    <div className="center">
      <h1>Add Place</h1>
      <form className="place-form" onSubmit={formSubmitHandler}>
        <div className="input-form">
          <label className="input-label" htmlFor="inputTitle">
            Title
          </label>
          <input
            className="input-type"
            type="text"
            id="inputTitle"
            name="inputTitle"
            onChange={titleChangeHandler}
            value={inputTitle}
            placeholder="Enter Title"
          />
        </div>
        <div className="input-form">
          <label className="input-label" htmlFor="inputDescription">
            Description
          </label>
          <input
            className="input-type"
            type="text"
            id="inputDescription"
            name="inputDescription"
            onChange={descriptionChangeHandler}
            value={inputDescription}
            placeholder="Enter Decription"
          />
        </div>
        <div className="input-form">
          <label className="input-label" htmlFor="inputAddress">
            Address
          </label>
          <input
            className="input-type"
            type="text"
            id="inputAddress"
            name="inputAddress"
            onChange={addressChangeHandler}
            value={inputAddress}
            placeholder="Enter Decription"
          />
        </div>
        <Button type="submit" name="Add" />
      </form>
    </div>
  );
};

export default AddPlace;
