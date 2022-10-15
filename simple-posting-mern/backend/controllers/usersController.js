const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
    const error = new HttpError("Invalid input check inputs", 422);
    return next(error);
  }

  // check user exist
  if (!existingUser) {
    console.log("Invalid Email");
    const error = new HttpError("Invalid Email", 422);
    return next(error);
  }

  // check password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log("Invalid Password");
    const error = new HttpError("Invalid Password", 422);
    return next(error);
  }

  // check password
  if (!isValidPassword) {
    console.log("Invalid Password");
    const error = new HttpError("Invalid Password", 422);
    return next(error);
  }

  res.json({
    message: "Logged In",
    user: existingUser.toObject({ getters: true }),
  });
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

  const { name, email, password } = req.body;

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log("Hashing Password Failed", err);
    const error = new HttpError("Hashing Password Failed", 500);
    return next(error);
  }

  // create new user
  const createUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    image:
      "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png",
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
