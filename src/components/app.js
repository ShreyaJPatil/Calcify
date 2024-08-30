document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("Amount");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const convertBtn = document.getElementById("convert-btn");
  const msg = document.getElementById("msg");
  const fromFlag = document.getElementById("from-flag");
  const toFlag = document.getElementById("to-flag");
  const currencies = {
    USD: { name: "USD", flag: "https://flagsapi.com/US/flat/64.png" },
    INR: { name: "INR", flag: "https://flagsapi.com/IN/flat/64.png" },
    EUR: { name: "EUR", flag: "https://flagsapi.com/EU/flat/64.png" },
    GBP: { name: "GBP", flag: "https://flagsapi.com/GB/flat/64.png" },
    AUD: { name: "AUD", flag: "https://flagsapi.com/AU/flat/64.png" },
    CAD: { name: "CAD", flag: "https://flagsapi.com/CA/flat/64.png" },
    JPY: { name: "JPY", flag: "https://flagsapi.com/JP/flat/64.png" },
    CHF: { name: "CHF", flag: "https://flagsapi.com/CH/flat/64.png" },
    CNY: { name: "CNY", flag: "https://flagsapi.com/CN/flat/64.png" },
    NZD: { name: "NZD", flag: "https://flagsapi.com/NZ/flat/64.png" },
    ZAR: { name: "ZAR", flag: "https://flagsapi.com/ZA/flat/64.png" },
    BRL: { name: "BRL", flag: "https://flagsapi.com/BR/flat/64.png" },
    RUB: { name: "RUB", flag: "https://flagsapi.com/RU/flat/64.png" },
    SGD: { name: "SGD", flag: "https://flagsapi.com/SG/flat/64.png" },
    HKD: { name: "HKD", flag: "https://flagsapi.com/HK/flat/64.png" },
    MXN: { name: "MXN", flag: "https://flagsapi.com/MX/flat/64.png" },
  };

  function populateCurrencyOptions() {
    for (let code in currencies) {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = code;
      option2.value = code;
      option1.text = `${currencies[code].name}`;
      option2.text = `${currencies[code].name}`;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  }

  function updateFlagImages() {
    fromFlag.src = currencies[fromCurrency.value].flag;
    toFlag.src = currencies[toCurrency.value].flag;
  }

  populateCurrencyOptions();
  updateFlagImages();

  fromCurrency.addEventListener("change", updateFlagImages);
  toCurrency.addEventListener("change", updateFlagImages);

  convertBtn.addEventListener("click", function () {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[to];
        if (rate) {
          const convertedAmount = (amount * rate).toFixed(2);
          msg.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
          msg.textContent = `Currency conversion rate not available.`;
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange rate:", error);
        msg.textContent = `Error fetching exchange rate.`;
      });
  });
});
