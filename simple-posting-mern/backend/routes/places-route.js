const express = require("express");

const router = express.Router();

const dummy_places = [
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

// Get: /api/places/id1
router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid; // get params id
  const place = dummy_places.find((place) => {
    return place.id === placeId;
  }); // return specific data based on params id

  if (!place) {
    const error = new Error("No Place Found for the provided Place ID");
    error.code = 404;
    throw error;
  }
  res.json({ place });
});

// Get: /api/places/user/id1
router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = dummy_places.find((place) => {
    return place.creator === userId;
  });

  if (!place) {
    const error = new Error("No Place Found for the provided User ID");
    error.code = 404;
    next(error);
  }

  res.json({ place });
});

module.exports = router;
