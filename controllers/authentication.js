const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to create an account",
        data: error,
      });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User account does not exists...",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }
    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 20 });
    //SEND RESPONSE TO FRONTEND
    const { _id, firstName, lastName, email } = user;
    return res.json({ token, user: { _id, firstName, lastName, email } });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signout",
  });
};
