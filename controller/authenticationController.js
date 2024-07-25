const Email = require("../utilities/email");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRATION,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  try {
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect Email or Password", 401));
    }
    // If everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({ status: "Success", token });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};

exports.sendEmail = async (req, res, next) => {
  try {
    // sendEmail({
    //   email: "hello@david.io",
    //   subject: "Test",
    //   message: "Test Email",
    // });
    const newUser = req.body.email;
    const url = `${req.protocol}://${req.get("host")}/email`;
    await new Email(url).sendWelcome();

    res.status(200).json({
      status: "success",
      message: "Email Sent Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
