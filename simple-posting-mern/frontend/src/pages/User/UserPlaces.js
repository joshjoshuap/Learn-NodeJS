import { useParams } from "react-router-dom";

import PlaceList from "../Place/PlaceList";

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

const UserPlaces = () => {
  const userId = useParams().userId; // get params id App.js - /:userId/places
  const loadPlaces = dummy_places.filter((place) => place.creatorId === userId); // return  specific object data for specific creator user id
  return (
    <div className="center">
      <PlaceList items={loadPlaces} />
    </div>
  );
};

export default UserPlaces;
