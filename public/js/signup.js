import axios from "axios";

const modal = document.querySelector(".modal-custom");
const overlay = document.querySelector(".overlay");

//Modal Functions for Registering Users
export const openModal = function () {
  modal.classList.remove("hidden_all");
  overlay.classList.remove("hidden_all");
};
export const closeModal = function () {
  modal.classList.add("hidden_all");
  overlay.classList.add("hidden_all");
};
export const removeScrolling = function () {
  document.body.classList.add("remove-scrolling");
};
export const enableScrolling = function () {
  document.body.classList.remove("remove-scrolling");
};
export const emailUser = async (email) => {
  try {
    const res = await axios.post("http://127.0.0.1:3000/api/v1/users/email", {
      email,
    });

    if (res.data.status === "Success") {
      console.log("Email Sent Successfully");
    }
  } catch (err) {
    console.log(err);
  }
};
export const signUp = async (
  name,
  phonenumber,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:3000/api/v1/users/create-user/signup",
      {
        name,
        phonenumber,
        email,
        password,
        passwordConfirm,
      }
    );
    res.status(201).json({
      status: "Success",
      data: {
        user: res.data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
