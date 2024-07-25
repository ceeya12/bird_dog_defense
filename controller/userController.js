const User = require("../model/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      data: {
        users: users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Failed to Fetch User Profiles",
    });
  }
};
