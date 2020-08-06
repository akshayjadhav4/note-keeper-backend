//import  mongoose
const mongoose = require("mongoose");
// import crypto
const crypto = require("crypto");
//import uuid for salt
const { v1: uuidv1 } = require("uuid");

const { ObjectId } = mongoose.Schema;

//user schema
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,
  notes: [
    {
      type: ObjectId,
      ref: "Note",
    },
  ],
});

//virtuals
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//mongoose methods
userSchema.method = {
  //authenticate user password
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },

  //encrypt password
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return " ";
    }
  },
};

//export schema
module.exports = mongoose.model("User", userSchema);
