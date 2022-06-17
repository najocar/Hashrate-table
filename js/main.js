// CONST
const ethApiUrl = "https://eth.2miners.com/api/stats";
const bitApiUrl = "https://api.coinbase.com/v2/prices/spot?currency=USD";
const multiApi =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cravencoin%2Cergo%2Cethereum-classic%2Ctontoken%2Cravencoin%2Cflux&vs_currencies=usd";
const ws = new WebSocket("wss://stream.binance.com:9443/ws/etheur@trade");
const table = document.getElementById("table-results");
const modelButton = document.getElementById("filter-model");
const coinButton = document.getElementById("filter-coin");
const hashrateButton = document.getElementById("filter-hashrate");
const powerButton = document.getElementById("filter-power");
const efficiencyButton = document.getElementById("filter-efficiency");
const priceButton = document.getElementById("filter-price");
const revenueButton = document.getElementById("filter-revenue");

// STATE
let ethDifficulty = null;
let order = null;
let orderType = null;
let newData = hashrateData;
let column = null;
let oldColumn = null;
let lastprice = null;
let lastpriceravencoin = null;
let lastpricetontoken = null;
let lastpriceflux = null;
let lastpriceethereum = null;
let lastpriceergo = null;
let lastpriceetc = null;

// coin price
let bitcoinPrice = null;
let ravencoin = null;
let tontoken = null;
let flux = null;
let ethereumPrice = null;
let ergoPrice = null;
let etcPrice = null;

// FUNCTIONS

// call api
const getEthDifficulty = () => {
  fetch(ethApiUrl)
    .then((response) => response.json())
    .then((data) => {
      ethDifficulty = data.nodes && data.nodes[0] && data.nodes[0].avgBlockTime;
      if (!ethDifficulty) getEthDifficulty();
    });
};

// call api múltiple
const getCurrencyPrice = () => {
  fetch(multiApi)
    .then((response) => response.json())
    .then((data) => {
      tontoken = parseFloat(data.tontoken.usd);
      ravencoin = parseFloat(data.ravencoin.usd);
      flux = parseFloat(data.flux.usd);
      ethereumPrice = parseFloat(data.ethereum.usd);
      ergoPrice = parseFloat(data.ergo.usd);
      etcPrice = parseFloat(data["ethereum-classic"].usd);

      if (!ravencoin) getCurrencyPrice();
      let ravencoinid = document.getElementById("ravencoin");
      ravencoinid.innerHTML = ravencoin.toFixed(5);
      ravencoinid.style.color = !ravencoin || lastpriceravencoin === ravencoin || !lastpriceravencoin ?
        "black" :
        ravencoin > lastpriceravencoin ?
        "green" :
        "red";
      document.getElementById("fluctuacionravencoin").innerHTML = !ravencoin || lastpriceravencoin === ravencoin || !lastpriceravencoin ?
        `$` :
        ravencoin > lastpriceravencoin ?
        `<i class="fa fa-angle-up" style = "color: green"></i>` :
        `<i class="fa fa-angle-down" style = "color: red"></i>`;
      lastpriceravencoin = ravencoin;

      if (!ergoPrice) getCurrencyPrice();
      let ergoid = document.getElementById("ergo");
      ergoid.innerHTML = ergoPrice.toFixed(5);
      ergoid.style.color = !ergoPrice || lastpriceergo === ergoPrice || !lastpriceergo ?
        "black" :
        ergoPrice > lastpriceergo ?
        "green" :
        "red";
      document.getElementById("fluctuacionergo").innerHTML = !ergoPrice || lastpriceergo === ergoPrice || !lastpriceergo ?
        `$` :
        ergoPrice > lastpriceergo ?
        `<i class="fa fa-angle-up" style = "color: green"></i>` :
        `<i class="fa fa-angle-down" style = "color: red"></i>`;
        lastpriceergo = ergoPrice;

      if (!etcPrice) getCurrencyPrice();
      let etcid = document.getElementById("etc");
      etcid.innerHTML = etcPrice.toFixed(4);
      etcid.style.color = !etcPrice || lastpriceetc === etcPrice || !lastpriceetc ?
        "black" :
        etcPrice > lastpriceetc ?
        "green" :
        "red";
      document.getElementById("fluctuacionetc").innerHTML = !etcPrice || lastpriceetc === etcPrice || !lastpriceetc ?
        `$` :
        etcPrice > lastpriceetc ?
        `<i class="fa fa-angle-up" style = "color: green"></i>` :
        `<i class="fa fa-angle-down" style = "color: red"></i>`;
        lastpriceetc = etcPrice;

      if (!ethereumPrice) getCurrencyPrice();
      let ethereumid = document.getElementById("ethereum");
      ethereumid.innerHTML = ethereumPrice.toFixed(2);
      ethereumid.style.color = !ethereumPrice || lastpriceethereum === ethereumPrice || !lastpriceethereum ?
        "black" :
        ethereumPrice > lastpriceethereum ?
        "green" :
        "red";
      document.getElementById("fluctuacionethereum").innerHTML = !ethereumPrice || lastpriceethereum === ethereumPrice || !lastpriceethereum ?
        `$` :
        ethereumPrice > lastpriceethereum ?
        `<i class="fa fa-angle-up" style = "color: green"></i>` :
        `<i class="fa fa-angle-down" style = "color: red"></i>`;
        lastpriceethereum = ethereumPrice;
        newData = updateData(ethereumPrice.toFixed(2), hashrateData);
        tablePrint(newData);
    });
};

// switch sort
const getOrder = (order) => {
  switch (order) {
    case null:
      return "asc";
    case "asc":
      return "desc";
    case "desc":
      return "asc";
  }
};

// sort for model

const orderByModel = (data, order) => {
  if (order === "asc")
    return data.sort((a, b) => a.model.localeCompare(b.model));
  if (order === "desc")
    return data.sort((a, b) => b.model.localeCompare(a.model));
};

// sort for hashrate

const orderByHashrate = (data, order) => {
  if (order === "asc") return data.sort((a, b) => a.parameters[0].hashrate - b.parameters[0].hashrate);
  if (order === "desc") return data.sort((a, b) => b.parameters[0].hashrate - a.parameters[0].hashrate);
};

// sort for power

const orderByPower = (data, order) => {
  if (order === "asc") return data.sort((a, b) => a.Napájení - b.Napájení);
  if (order === "desc") return data.sort((a, b) => b.Napájení - a.Napájení);
};

// sort for eficiencia

const orderByEfficiency = (data, order) => {
  if (order === "asc") return data.sort((a, b) => a.efficiency - b.efficiency);
  if (order === "desc") return data.sort((a, b) => b.efficiency - a.efficiency);
};

const calculateRevenue = (hashrate, ethereumPrice, difficulty) => {
  if (!hashrate || !ethereumPrice || !difficulty) {
    return "načítání ...";
  }

  // Calculate revenue
  const precioFinal =
    ((((hashrate * 1000000) / ((1029.23 / difficulty) * 1000 * 1000000000)) *
        ((60 / difficulty) * 2) *
        (60 * 24 * 30) *
        ethereumPrice) /
      365);
  return `${precioFinal.toFixed(3)}$`;
};

const printFlecha = () => {
  if (order === "asc") {
    if (oldColumn) {
      document.getElementById(oldColumn).innerHTML = `<i class=""></i>`;
    }
    document.getElementById(
      column
    ).innerHTML = `<i class="fa fa-chevron-circle-down"></i>`;
  }
  if (order === "desc") {
    document.getElementById(oldColumn).innerHTML = `<i class=""></i>`;
    document.getElementById(
      column
    ).innerHTML = `<i class="fa fa-chevron-circle-up"></i>`;
  }
};

const tablePrint = (data) => {
  let finalData = data;

  // We delete the table to update it
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  // Sort the table
  if (orderType === "string") {
    finalData = orderByModel(finalData, order);
  }
  if (orderType === "coin") {
    finalData = orderByModel(finalData, order);
  }
  if (orderType === "hashrate") {
    finalData = orderByHashrate(finalData, order);
  }
  if (orderType === "power") {
    finalData = orderByPower(finalData, order);
  }
  if (orderType === "efficiency") {
    finalData = orderByEfficiency(finalData, order);
  }
  if (orderType === "price") {
    finalData = orderByHashrate(finalData, order);
  }
  if (orderType === "revenue") {
    finalData = orderByHashrate(finalData, order);
  }

  // Print the table
  finalData.map((row) => {
    // We calculate the values ​​before painting them
    let efficiency = row.parameters[0].hashrate / row.Power;
    const rowPrecio = row.ethereumPrice ? `${row.ethereumPrice}$` : "načítání ...";
    const rowRevenue = calculateRevenue(
      row.parameters[0].hashrate,
      row.ethereumPrice,
      ethDifficulty
    );

    table.innerHTML += `
  <td class="model"><a href="./tarjeta.html?model=${row.id}" target="_blank">${
      row.model
    }</a></td>
  <td class="priority-3">${row.coin}</td>
  <td>${row.parameters[0].hashrate} Mh/s</td>
  <td>${row.parameters[0].Power}w</td>
  <td>${efficiency.toFixed(2)}Mh/w</td>
  <td>${rowPrecio}</td>
  <td>${rowRevenue}</td>
</tr>`;
  });
};

function numeroFila(linea) {
  numeroDeLinea = linea;
}

const updateData = (ethereumPrice, data) =>
  data.map((row) => ({
    ...row,
    ethereumPrice,
  }));

// calcularROI
function calcularROI() {
  const valor1 = document.getElementById("valor1").value;
  const valor2 = document.getElementById("valor2").value;
  if (valor1 == 0) {
    document.getElementById(
      "resultado"
    ).innerHTML = `Necesito el precio de la tarjeta gráfica`;
  } else if (valor2 == 0) {
    document.getElementById("resultado").innerHTML = `Necesito el Revenue`;
  } else {
    let resultado = valor1 / valor2;
    document.getElementById("resultado").innerHTML = `${resultado.toFixed(
      0
    )} Días`;
  }
}

modelButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "string";
  oldColumn = column;
  column = "model";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

coinButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "coin";
  oldColumn = column;
  column = "coin";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

hashrateButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "hashrate";
  oldColumn = column;
  column = "hashrate";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

powerButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "power";
  oldColumn = column;
  column = "power";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

efficiencyButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "efficiency";
  oldColumn = column;
  column = "efficiency";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

priceButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "price";
  oldColumn = column;
  column = "price";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

revenueButton.addEventListener("click", () => {
  // We update the orderType and the order before painting the table
  orderType = "revenue";
  oldColumn = column;
  column = "revenue";
  order = getOrder(order);
  tablePrint(newData);
  printFlecha();
});

revenueButton.click();
revenueButton.click();

getCurrencyPrice();
setInterval("getCurrencyPrice()", 5000);

getEthDifficulty();
tablePrint(hashrateData);