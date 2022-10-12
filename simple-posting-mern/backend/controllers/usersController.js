const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid"); // generate unique id

const HttpError = require("../models/http-error");

const dummy_user = [
  {
    id: "u1",
    name: "Josh",
    email: 'test"tes.com',
    password: "password123",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: dummy_user });
};

const login = (req, res, next) => {
  const { email, password } = req.body; // get user body post data

  const findUser = dummy_user.find((user) => user.email === email);

  if (!findUser || findUser.password !== password) {
    throw new HttpError("Incorrect Email and Password", 401);
  }

  res.json({ message: "Logged In" });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input check inputs", 422);
  }

  const { name, email, password } = req.body;

  const userExist = dummy_user.find((user) => user.email === email);

  if (userExist) {
    throw new HttpError("Email/User Alredy Exist", 422);
  }

  const createUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  dummy_user.push(createUser);

  res.status(201).json({ user: createUser });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
