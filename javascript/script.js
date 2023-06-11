"use strict";

const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const btnSwap = document.getElementById("btn-swap");
const exchangeValueEl = document.getElementById("exchange-value");
const inputOneEl = document.getElementById("input-one");
const inputTwoEl = document.getElementById("input-two");

//global variable

const url = `https://v6.exchangerate-api.com/v6/ca093239e0692b5c1ca73c32/latest/INR`;

//function
const init = () => {
  getCountryName();
  getExchangeRate();
};

async function getCountryName() {
  const response = await fetch(`${url}`);
  const data = await response.json();
  const countryArr = Object.keys(data.conversion_rates);
  addCurrencyCode(currencyOneEl, countryArr);
  addCurrencyCode(currencyTwoEl, countryArr);
}
const addCurrencyCode = (ele, countryArr) => {
  countryArr.forEach((countryCode) => {
    const optionEL = document.createElement("option");
    optionEL.value = countryCode;
    optionEL.innerText = countryCode;
    if (countryCode !== "INR") {
      ele.appendChild(optionEL);
    }
  });
};
async function getExchangeRate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;
  console.log(currencyOne);
  const response = await fetch(`${url}`);
  const data = await response.json();
  const rateOne = data.conversion_rates[currencyOne];
  const rate = data.conversion_rates[currencyTwo];
  console.log(rate);
  exchangeValueEl.innerText = `${rateOne.toFixed(
    2
  )} ${currencyOne} = ${rate.toFixed(2)} ${currencyTwo}`;
  inputTwoEl.value = (inputOneEl.value * rate).toFixed(2);
}

//event listener
currencyOneEl.addEventListener("change", getExchangeRate);
currencyTwoEl.addEventListener("change", getExchangeRate);
inputOneEl.addEventListener("input", getExchangeRate);
btnSwap.addEventListener("click", () => {
  [currencyOneEl.value, currencyTwoEl.value] = [
    currencyTwoEl.value,
    currencyOneEl.value,
  ];
  // [inputOneEl.value, inputTwoEl.value] = [inputTwoEl.value, inputOneEl.value];
  getExchangeRate();
});

//init

init();
