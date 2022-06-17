const baseUrl = "https://api-trading-simulator.herokuapp.com";

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
  const newUser = await axios.post(`${baseUrl}/auth/signup`, {
    email: signupEmail,
    password: signupPassword,
  });
  console.log(newUser);
}

// LogIn my user
async function login(e) {
  e.preventDefault();
  await axios.post(`baseUrl${"/auth/login"}`, {
    email,
    password,
  });
}
