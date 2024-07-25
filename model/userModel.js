const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phonenumber: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    //this only works on save
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },

  // role: {
  //   type: String,
  //   enum: ["user", "admin"],
  //   default: "user",
  // },
});

//Document Middleware: runs before .save() and .create()

userSchema.pre("save", async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

//Instance method: available on all documents in a collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  //candidatePassword is the password that the user types in
  //userPassword is the password that is stored in the database
  //compare()Will return true or false
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
