const express = require("express");

const placesController = require("../controllers/placesController");

const router = express.Router();

// Get: /api/places/id1
router.get("/:pid", placesController.getPlaceById);

// Post: /api/places/
router.post("/", placesController.createPlace);

// Patch: /api/places/id1
router.patch("/:pid", placesController.updatePlace);

// Delete: /api/places/id1
router.delete("/:pid", placesController.deletePlace);

// Get: /api/places/user/id1
router.get("/user/:uid", placesController.getUserById);

module.exports = router;
