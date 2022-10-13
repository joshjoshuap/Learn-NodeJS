const { validationResult } = require("express-validator");
// const { v4: uuidv4 } = require("uuid"); // generate unique id
const HttpError = require("../models/http-error");

const PlaceModel = require("../models/place");

// GET: /api/places/user/:uid - Display Place by User
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid; // get params id
  let place;

  try {
    place = await PlaceModel.find({ creator: userId }); // find & return all object based on user id
  } catch (err) {
    console.log("No Place Found");
    const error = new HttpError(
      "No Place Found for the provided Place User Id",
      500
    );
    return next(error);
  }

  // error handling check user params
  if (!place || place.length === 0) {
    return next(new HttpError("No Place Found for the provided User ID"), 404);
  }

  res.json({ place: place.map((place) => place.toObject({ getters: true })) }); // return/send json data
};

// GET: /api/places/:pid - Display Place
const getPlaceById = async (req, res, next) => {
  let place;
  const placeId = req.params.pid;

  try {
    place = await PlaceModel.findById(placeId); // find place by id
  } catch (err) {
    console.log("No Place Found");
    const error = new HttpError(
      "No Place Found for the provided Place ID",
      500
    );
    return next(error);
  }

  if (!place || place.length === 0) {
    console.log("No Place Found");
    const error = new Error("No Place Found for the provided Place ID", 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

// POST: /api/places/ - Add New Place
const createPlace = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input check inputs", 422);
  }

  const { title, description, image, address, creator } = req.body; // destructing data from post body json

  // assign new data by model schema
  const addPlace = new PlaceModel({
    title: title,
    description: description,
    image: image,
    address: address,
    creator: creator,
  });

  try {
    await addPlace.save(); // save added new place to database
    console.log("Creating Place Successful");
  } catch (err) {
    console.log("Creating Place Failed", err);
    const error = new HttpError("Creating Place Failed", 500);
    return next(error);
  }

  res.status(201).json({ place: addPlace });
};

// PATCH: /api/places/:pid - Edit Place
const updatePlace = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input check inputs", 422);
  }

  let place;
  const placeId = req.params.pid;
  const { title, description, image, address, creator } = req.body; // destructing data from post body json

  try {
    place = await PlaceModel.findById(placeId);
    console.log("Updating Place Succesful");
  } catch (err) {
    console.log("Updating Place Failed");
    const error = new HttpError("Updating Place Failed", 500);
    return next(error);
  }

  // get current data and rewrite old data
  place.title = title;
  place.description = description;
  place.image = image;
  place.address = address;
  place.creator = creator;

  try {
    await place.save(); // saving updated data in database
  } catch (err) {
    console.log("Updating Place Failed");
    const error = new HttpError("Updating Place Failed", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// DELETE: /api/places/:pid - Delete Place
const deletePlace = async (req, res, next) => {
  let place;
  const placeId = req.params.pid;

  try {
    place = await PlaceModel.findById(placeId);
    console.log("Deleting Place Succesful");
  } catch (err) {
    console.log("Deleting Place Failed");
    const error = new HttpError("Deleting Place Failed", 500);
    return next(error);
  }

  try {
    await place.remove(); // deleting place in database
  } catch (err) {
    console.log("Deleting Place Failed");
    const error = new HttpError("Deleting Place Failed", 500);
    return next(error);
  }

  res.status(200).json({ message: "Place Deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
