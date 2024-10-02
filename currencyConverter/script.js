currencyElementOne = document.getElementById("currency-one");
amountElementOne = document.getElementById("amount-one");
currencyElementTwo = document.getElementById("currency-two");
amountElementTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

// This function will fetch exchange rates and update the DOM 
function calculate() {
    const currency_one = currencyElementOne.value;
    const currency_two = currencyElementTwo.value;

    fetch(`https://open.er-api.com/v6/latest/USD${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data) to check if it's working;
        const rate = data.rates[currency_two];
        // console.log(rate);
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
    });
}

// Event Listenters
currencyElementOne.addEventListener("change", calculate)
amountElementOne.addEventListener("input", calculate)
currencyElementTwo.addEventListener("change", calculate)
amountElementTwo.addEventListener("input", calculate)

calculate();