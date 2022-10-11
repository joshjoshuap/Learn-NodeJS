import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";

const dummy_places = [
  {
    id: "p1",
    title: "Place 1",
    description: "Sample text description paragraph",
    imageUrl:
      "https://luxeadventuretraveler.com/wp-content/uploads/2012/12/Luxe-Adventure-Traveler-Dubai-Burj-Khalifa-6.jpg",
    address: "City, Dubai",
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Place 2",
    description: "Sample text description paragraph",
    imageUrl:
      "https://luxeadventuretraveler.com/wp-content/uploads/2012/12/Luxe-Adventure-Traveler-Dubai-Burj-Khalifa-6.jpg",
    address: "City, Dubai",
    creatorId: "u2",
  },
];

const EditPlace = () => {
  const placeId = useParams().placeId; // get place id
  const identifiedPlace = dummy_places.find((p) => p.id === placeId);

  const [editTitle, setEditTitle] = useState(identifiedPlace.title);
  const [editDescription, setEditDescription] = useState(
    identifiedPlace.description
  );

  const titleChangeHandler = (event) => {
    setEditTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEditDescription(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(editTitle, editDescription);
  };

  if (!identifiedPlace) {
    return (
      <div className="place-list center">
        <h2>No Place Found</h2>
      </div>
    );
  }

  return (
    <div className="center">
      <h1>Edit Place</h1>
      <form className="place-form" onSubmit={formSubmitHandler}>
        <div className="input-form">
          <label className="input-label" htmlFor="editTitle">
            Title
          </label>
          <input
            className="input-type"
            type="text"
            id="editTitle"
            name="editTitle"
            onChange={titleChangeHandler}
            value={editTitle}
            placeholder="Enter Title"
          />
        </div>
        <div className="input-form">
          <label className="input-label" htmlFor="editDescription">
            Description
          </label>
          <input
            className="input-type"
            type="text"
            id="editDescription"
            name="editDescription"
            onChange={descriptionChangeHandler}
            value={editDescription}
            placeholder="Enter Decription"
          />
        </div>
        <Button type="submit" name="Edit" />
      </form>
    </div>
  );
};

export default EditPlace;
