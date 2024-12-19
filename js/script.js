const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button"); // Fixed querySelectorAll to querySelector

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_code) { // Added 'let' to declare currency_code
        let selected;
        if (i === 0) { // Fixed equality operator from == to ===
            selected = currency_code === "USD" ? "selected" : ""; // Fixed equality operator
        } else if (i === 1) { // Fixed equality operator from == to ===
            selected = currency_code === "INR" ? "selected" : ""; // Fixed equality operator
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in country_code){
        if(code === element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", (e) => { // Fixed misplaced arrow function syntax
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value; // Fixed nodeValue to value
    if (amountVal === "" || amountVal === "0") { // Fixed equality operator from == to ===
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/a2e9e31b9e515cc074c46d38/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    }).catch(() =>{
            exchangeRateTxt.innerText = "something went wrong";
    });
}
