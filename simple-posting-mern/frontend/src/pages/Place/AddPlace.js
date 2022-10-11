import { useState } from "react";
import Button from "../../components/Button";
import "./AddPlace.css";

const AddPlace = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const titleChangeHandler = (event) => {
    setInputTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(inputTitle, inputDescription);
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
        <Button type="submit" name="Add" />
      </form>
    </div>
  );
};

export default AddPlace;
