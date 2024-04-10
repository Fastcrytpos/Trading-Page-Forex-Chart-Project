const baseCurrency = "USD";
const discoveredPairs = [];

function discoverUsdPairs(baseCurrency) {
    const testCurrencies = ["EUR", "GBP", "JPY", "CHF", "AUD", "CAD"];
    const interval = 20000; // Interval between requests in milliseconds (20 seconds)
    let currentIndex = 0;

    function makeRequest() {
        if (currentIndex < testCurrencies.length) {
            const testCurrency = testCurrencies[currentIndex];
            const url = `https://api.polygon.io/v2/aggs/ticker/C:${baseCurrency}${testCurrency}/range/1/day/2024-04-09/2024-04-09?apiKey=FyHlRpbLAFbXkejVbq__J4Fre2wp3MWx`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        const currencyPair = `C:USD${testCurrency}`;
                        const closingPrice = data.results[0].c;
                        discoveredPairs.push({ "pair": currencyPair, "close": closingPrice });
                        console.log(discoveredPairs);
                    }
                    currentIndex++;
                    setTimeout(makeRequest, interval); // Schedule next request after interval
                })
                .catch(error => console.error(error));
        }
    }

    makeRequest(); // Start making requests
    return discoverUsdPairs;
}

function displayCurrencyPairs() {
  const currencyList = document.getElementById("currency-list");
  
  for (pair of discoveredPairs){
      const listItem = document.createElement('li');
      listItem.textContent = `${pair.pair} - Previous Close: ${pair.close}`;
      currencyList.appendChild(listItem);
  };
}

discoverUsdPairs(baseCurrency);
