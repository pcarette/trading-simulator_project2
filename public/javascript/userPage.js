// const baseUrl = "https://api-trading-simulator.herokuapp.com";
const baseUrl = "http://localhost:3000";

// DOM manipulation
const myCash = document.querySelector("#cash");
const myHoldings = document.querySelector("#holdings");

// EventListeners

// Display my cash value
async function displayCashValue() {
  myCash.innerHTML = null;
  const { cash } = await axios.get(`${baseUrl}/user/cash`);
  console.log({ cash });
  myCash.textContent = cash;
}
displayCashValue();

// Display my holdings value

// Buy Stocks

// Sell stocks
