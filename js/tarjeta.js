// CONST
const cardUrl = new URL(window.location.href);
const modelId = cardUrl.searchParams.get("model");
const modelData = hashrateData.find(modelo => modelo.id === modelId);
const prices = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cravencoin%2Cergo%2Cethereum-classic&vs_currencies=usd"
const table = document.getElementById("table-results");
const nombre = document.getElementById("nombre")
const Card = Object.values(modelData);
const ethparametros = document.getElementById("ethparametros");

// STATE
let newData = modelData;
let ethereumPrice = null;
let ravencoinPrice = null;
let ergoPrice = null;
let ethereumClassicPrice = null;

// FUNCTIONS
const logo = (coin) => {
  if (coin === "ETH") {
    return (`./img/ethereum.png`)
  } else if (coin === "RVN") {
    return (`./img/ravencoin.png`)
  } else if (coin === "ERG") {
    return (`./img/ergo.png`)
  } else if (coin === "ETC") {
    return (`./img/ethereum-classic.png`)
  } else {
    return (`error`)
  }
};

const getPrices = () => {
  fetch(prices)
    .then((response) => response.json())
    .then((data) => {
      ethereumPrice = parseInt(data.ethereum.usd);
      ravencoinPrice = parseFloat(data.ravencoin.usd);
      ergoPrice = parseFloat(data.ergo.usd);
      ethereumClassicPrice = parseFloat(data["ethereum-classic"].usd);
      tablePrint(Card[0]);

    });

  const tablePrint = (data) => {
    let finalData = data;

    // PRINT TABLE
    finalData.map((row) => {

      function revenue() {
        if (row.coin === "ETH") {
          return ((24 / (((1 / 13300 * 1030000000) / row.hashrate) * 24) * ethereumPrice).toFixed(2));
        } else if (row.coin === "RVN") {
          return ((24 / (((1 / 3600000 * 3110000) / row.hashrate) * 24) * ravencoinPrice).toFixed(2));
        } else if (row.coin === "ERG") {
          return ((24 / (((1 / 45360 * 16260000) / row.hashrate) * 24) * ergoPrice).toFixed(2));
        } else if (row.coin === "ETC") {
          return ((24 / (((1 / 20789 * 25030000) / row.hashrate) * 24) * ethereumClassicPrice).toFixed(2));
        } else {
          return ("error")
        }
      }

      table.innerHTML += `<tr style="border-bottom: .5px solid black; text-align: center;">
      <td style="text-align: center;">${row.coin}</td>
      <td style="text-align: center;">${row.hashrate}Mh/s</td>
      <td style="text-align: center;">${row.Power}w</td>
      <td style="text-align: center;" class="priority-3">${(row.hashrate/row.Power).toFixed(3)}Mh/w</td>
      <td style="text-align: center;">${revenue()}$</td>
      </tr>`;

      let overclockData = row.parameters;
      ethparametros.innerHTML += `<h1 style="text-align: center; margin-top: 100px">${row.coin} <img src="${logo(row.coin)}" 
      style="width: 35px; margin-bottom: -5px; display: inline;"></h1>`;

      overclockData.forEach(element => {
        ethparametros.innerHTML += `
        <table id="myTablep" style="margin: auto; width: 30%; margin-bottom: 10px; text-align:center;
        border-bottom: .5px solid black; padding-bottom: 10px;">         
        <tr>
        <td style="margin: auto; width: 50%; text-align: left;"><h2>${Object.keys(element)}</h2></td>
        <td style="margin: auto; width: 40%"><h2 style="text-align:center">${Object.values(element)}</h2></td>
        </tr> </table>`;
      });
      ethparametros.innerHTML += `
        <table id="myTablep" style="margin: auto; width: 30%; margin-bottom: 10px; text-align:center;
        border-bottom: .5px solid black; padding-bottom: 10px;">         
        <tr>
        <td style="margin: auto; width: 50%; text-align: left;"><h2>Revenue</h2></td>
        <td style="margin: auto; width: 40%"><h2 style="text-align:center">${revenue()} $</h2></td>
        </tr> </table>`;
    });
  };
};
// EJECUTION
nombre.innerHTML = modelData.model;
getPrices();