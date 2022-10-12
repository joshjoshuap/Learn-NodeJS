const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

let dummy_places = [
  {
    id: "p1",
    title: "greate wall of china",
    description: "big wall",
    address: "China",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Eiffle Tower",
    description: "Tower from france",
    address: "France",
    creator: "u2",
  },
];

// get: send/display specific place
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // get params id
  const place = dummy_places.find((place) => {
    return place.id === placeId;
  }); // return specific data based on params id

  if (!place) {
    throw new Error("No Place Found for the provided Place ID", 404);
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, address, creator } = req.body; // destructing 7 getting data of post body json

  const addPlace = {
    id: uuidv4(),
    title: title,
    description: description,
    address: address,
    creator: creator,
  };

  dummy_places.push(addPlace);

  res.status(201).json({ place: addPlace });
};

const updatePlace = (req, res, next) => {
  const { title, description, address, creator } = req.body; // destructing 7 getting data of post body json
  const placeId = req.params.pid;

  const updatePlace = { ...dummy_places.find((place) => place.id === placeId) };
  const placeIndex = dummy_places.findIndex((place) => place.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;
  updatePlace.address = address;
  updatePlace.creator = creator;

  dummy_places[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  dummy_places = dummy_places.filter((place) => placeId === placeId);

  res.status(200).json({ message: "Place Deleted" });
};

// get: send/display places by specific user
const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const place = dummy_places.find((place) => {
    return place.creator === userId;
  });

  if (!place) {
    next(new HttpError("No Place Found for the provided User ID"), 404);
  }

  res.json({ place });
};

exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
