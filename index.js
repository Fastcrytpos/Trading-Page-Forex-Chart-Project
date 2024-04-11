

// function discoverUsdPairs() {
//     const testCurrencies = ["EUR", "GBP", "JPY", "CHF", "AUD", "CAD"];

//     for (const testCurrency of testCurrencies) {
//         const options = {method: 'GET', headers: {accept: 'application/json'}};

//         fetch(`https://api.fastforex.io/time-series?from=USD&to=${testCurrency}&start=2024-04-01&end=2024-04-11&interval=P1D&api_key=8236f24a7e-4cbd3466a0-sbrnsg`, options)
//           .then(response => response.json())
//           .then(response => console.log(response))
//           .catch(err => console.error(err));

//     }
// }

// discoverUsdPairs();

// document.getElementById("currency-list")
// document.createElement("li")
let myChart=null;

fetch('http://localhost:3000/currencies')
.then(res=>res.json())
.then(data=>{
    //console.log(data);
    createCurrency(data)})



    .catch(err=>console.log(err))

function createCurrency(data) {
    const currencyList = document.getElementById("currency-list");
        for (const i of data) {
            const currency = `USD${Object.keys(i.results)}`;
            //console.log(currency);
            
            const pairs = document.createElement("li");
            pairs.textContent = currency;
            //console.log(pairs);
            pairs.addEventListener("click",()=>{handleClick(i.results)});
            currencyList.appendChild(pairs);
        }
    }

function handleClick(results){
    //console.log(event.target.textContent);
    //console.log(results)
    //console.log(Object.keys(results))
   
    let dates=(Object.keys(Object.values(results)[0]))
    let values=(Object.values(Object.values(results)[0]))
    console.log(dates)
    console.log(values)

    if (myChart) {
        myChart.destroy();
    }
    
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");
    updateHistoricalData(dates,values)

    
    myChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Currency Value",
                data: values,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            }]
        },
    });

}

function updateHistoricalData(dates, values) {
    let table = document.getElementById("historicaldata");

   
    table.innerHTML = '';

    
    for (let i = 0; i < dates.length && i < values.length; i++) {
        let newRow = document.createElement("tr");

        let dateCell = document.createElement("td");
        dateCell.innerText = dates[i];
        newRow.appendChild(dateCell);

        let valueCell = document.createElement("td");
        valueCell.innerText = values[i]; 
        newRow.appendChild(valueCell);

        table.appendChild(newRow); 
    }
}

