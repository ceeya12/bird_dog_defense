// import { User } from "../model/userModel";
//

exports.getMainLayout = (req, res) => {
  res.status(200).render("base");
};
exports.getLoginForm = (req, res) => {};

exports.getLogin = (req, res, next) => {
  try {
    res.status(200).render("classoverview", { title: "Class Overview" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: `${err}`,
    });
  }
};
