const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/usersController");

const router = express.Router();

// GET: /api/user/
router.get("/", userController.getUsers);

// POST: /api/user/login
router.post("/login", userController.login);

// POST: /api/user/signup
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.signup
);

module.exports = router;
