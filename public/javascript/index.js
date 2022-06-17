// const baseUrl = "https://api-trading-simulator.herokuapp.com";
const baseUrl = "http://localhost:3000";

// DOM manipulation
const signupEmail = document.querySelector("#signup-email");
const signupPassword = document.querySelector("#signup-password");

const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");

// Buttons
const signupFrom = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

// Event listeners
signupFrom.addEventListener("submit", signup);
loginForm.addEventListener("submit", login);

// SignUp my user
async function signup(e) {
  e.preventDefault();
  const emailValue = signupEmail.value
  const passwordValue = signupPassword.value
  const newUser = await axios.post(`${baseUrl}/auth/signup`, {
    email: emailValue,
    password: passwordValue,
  });
  console.log(newUser);
}

// LogIn my user
async function login(e) {
  e.preventDefault();
  const emailValue = loginEmail.value
  const passwordValue = loginPassword.value
  const loggedUser = await axios.post(`${baseUrl}/auth/login`, {
    email: emailValue,
    password: passwordValue,
  });
  console.log(loggedUser);
}
