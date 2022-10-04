const express = require("express");
const { check, body } = require("express-validator"); // validate user input

const router = express.Router();

const authController = require("../controllers/auth");
const UserModel = require("../models/user");

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Enter valid email address")
      .normalizeEmail(),
    body("password").isLength({ min: 6 }).isAlphanumeric().trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignUp);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email ALready Exist");
          }
        });
      }),
    body("password", "Enter min 6 password only")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.postSignUp
); // validate user input signup

module.exports = router;
