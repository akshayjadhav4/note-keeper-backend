//import  mongoose
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

//note schema
var noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// export schema
module.exports = mongoose.model("Note", noteSchema);
