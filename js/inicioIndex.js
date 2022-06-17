const divtabla = document.getElementById("divtabla");

const inicio = () => {
    divtabla.innerHTML = `
    <div id="header">
    <h1>Hashrate</h1>
    <h2 id="Table">Y ayuda a que la GPU se mantenga activa por más tiempo gracias a una mejor temperatura y un menor ruido.</h2>
    <h2 id="Table" style="padding-bottom: 80px;">La mejor relación entre consumo de energía y rendimiento.</h2>
  </div>
  <div class="row" style="margin-top: 20px; margin-left: 35px">
    <div class="column">
        <h1>
          <img src="./img/ethereum.png" alt="eth" style="width: 35px; margin-bottom: -8px; margin-left: 40px">
          <span id="ethereum"></span>
          <span id="fluctuacionethereum"></span>
        </h1>
        <span class="tooltiptext">Ethereum</span>
    </div>
    <div class="column">
      <h1>
        <img src="./img/ravencoin.png" alt="ravencoin" style="width: 35px; margin-bottom: -8px; margin-left: 45px">
        <span id="ravencoin"></span>
        <span id="fluctuacionravencoin"></span>
      </h1>
      <span class="tooltiptext">Ravencoin</span>
    </div>
    <div class="column">
      <h1>
        <img src="./img/ergo.png" alt="ergo" style="width: 35px; margin-bottom: -8px; margin-left: 40px">
        <span id="ergo"></span>
        <span id="fluctuacionergo"></span>
      </h1>
      <span class="tooltiptext">Ergo</span>
    </div>
    <div class="column">
      <h1>
        <img src="./img/ethereum-classic.png" alt="etc" style="width: 35px; margin-bottom: -8px; margin-left: 40px">
        <span id="etc"></span>
        <span id="fluctuacionetc"></span>
      </h1>
      <span class="tooltiptext">Ethereum Classic</span>
    </div>
  </div>
  <table id="myTable">
    <thead>
      <tr>
        <th id="filter-model">Model <span id="model"></span></th>
        <th id="filter-coin" class="priority-3">Moneda <span id="coin"></span></th>
        <th id="filter-hashrate">Hashrate <span id="hashrate"></span></th>
        <th id="filter-power">Power <span id="power"></span></th>
        <th id="filter-efficiency">Efficiency <span id="efficiency"></span></th>
        <th id="filter-price">Precio ETH <span id="price"></span></th>
        <th id="filter-revenue">Revenue <span id="revenue"></span></th>
      </tr>
    </thead>
    <tbody id="table-results">
    </tbody>
  </table>
  <br>
  <table id="calculadora">
    <tr>
      <td><input id="valor1" type="number" min="0" placeholder="Precio de la tarjeta gráfica $"></td>
      <td><input id="valor2" type="number" min="0" placeholder="Revenue $"></td>
      <td><button id="calcular" onclick="calcularROI()">Calcular</button></td>
    </tr>
    <tr>
      <td id="resultado" colspan="3">Resultado</td>
    </tr>
  </table>
      `
};

inicio();