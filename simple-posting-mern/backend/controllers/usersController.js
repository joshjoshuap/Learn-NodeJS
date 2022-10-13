const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const UserModel = require("../models/user");

// GET: /api/user/
const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await UserModel.find({}, "-password"); // return users object except password
  } catch (err) {
    console.log("Fetching User Failed");
    const error = HttpError("Fetching User Failed", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// POST: /api/user/login
const login = async (req, res, next) => {
  const { email, password } = req.body; // get user body post data

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
    console.log("Login Succesful");
  } catch (err) {
    console.log("Login Failed");
    const error = HttpError("Invalid input check inputs", 422);
    return next(error);
  }

  // check user validation
  if (!existingUser || existingUser.password !== password) {
    console.log("Invalid Email, Password");
    const error = HttpError("Invalid Email, Password", 422);
    return next(error);
  }

  res.json({ message: "Logged In" });
};

// POST: /api/user/signup
const signup = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Name is required, Email must valid, Password length is greater than 6",
        422
      )
    );
  }

  const { name, email, password, image } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Finding User Error");
    const error = HttpError("Invalid input check inputs", 422);
    return next(error);
  }

  if (existingUser) {
    console.log("Email Exist Already");
    const error = new HttpError("User Exist Already, Try to Login", 422);
    return next(error);
  }

  // create new user
  const createUser = new UserModel({
    name,
    email,
    password,
    image,
    places: [],
  });

  try {
    await createUser.save(); // save new user to database
  } catch (err) {
    console.log("Signup Failed", err);
    const error = new HttpError("Signup Failed", 500);
    return next(error);
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
