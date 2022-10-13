const express = require("express");
const { check } = require("express-validator");

const placesController = require("../controllers/placesController");

const router = express.Router();

// Get: /api/places/id1
router.get("/:pid", placesController.getPlaceById);

// Get: /api/places/user/id1
router.get("/user/:uid", placesController.getPlacesByUserId);

// Post: /api/places/
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesController.createPlace
);

// Patch: /api/places/id1
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

// Delete: /api/places/id1
router.delete("/:pid", placesController.deletePlace);

module.exports = router;
