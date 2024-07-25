import "bootstrap";
import "./modules/plyr";
import "./modules/tooltip";
import "./modules/countdown";
import "./modules/headroom";
import "./modules/tiny-slider";
import "./modules/prism";
import "./modules/aos";
import "./modules/navbar";
import "./modules/parallax";
import "./modules/big-picture";
import "./modules/isotope";
import "./modules/offcanvas";
import "./modules/forms";
import "./modules/nouislider";
import "./modules/counter";
import "./modules/typed";
import "./modules/smooth-scroll";

import {
  openModal,
  closeModal,
  enableScrolling,
  removeScrolling,
  emailUser,
} from "./signup";
// import { createUser } from "./signup";
import { login } from "./login";
import { signUp } from "./signup";

const closeModalButton = document.querySelector(".close-modal");
const registerBtn = document.getElementById("emailRegister");

//Modal Functionality event Listeners
registerBtn.addEventListener("click", () => {
  openModal();
  removeScrolling();
  console.log("Register Button Clicked");
});

closeModalButton.addEventListener("click", () => {
  closeModal();
  enableScrolling();
  console.log("Close Button Clicked");
});

console.log("Hello from the index.js module");

//User Registration
const registerForm = document.getElementById("formSignUp");

if (registerForm)
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("passwordConfirm").value;
    console.log(email);
    signUp(name, phonenumber, email, password, confirmPassword);
  });

//User Login
const signInBtn = document.getElementById("signIn");

signInBtn.addEventListener("click", () => {
  openModal();
  removeScrolling();
  console.log("Sign In Button Clicked");
});

const signInForm = document.getElementById("formSignIn");

if (signInForm)
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;
    // Function call from login.js
  });
