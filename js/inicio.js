const divtabla = document.getElementById("divtabla");

const inicio = () => {
  divtabla.innerHTML = `
    <div id="header">
    <h1 id="nombre" style="text-align: center; padding-bottom: 40px; padding-top: 40px;"></h1>
    </div>
    <table id="myTable" style="margin: auto; width: 90%; margin-bottom: 100px;">
      <thead>
        <tr style="border-bottom: .5px solid black;">
          <th style="text-align: center;">Moneda</th>
          <th style="text-align: center;">Hashrate</th>
          <th style="text-align: center;">Power</th>
          <th style="text-align: center;" class="priority-3">Efficiency</th>
          <th style="text-align: center;">Revenue</th>
        </tr>
      </thead>
      <tbody id="table-results">
      </tbody>
    </table>
    <br>
    <h1 style="text-align: center;">Recomendación de Overclock</h1>
    <div id="ethparametros">
  
    </div>
    `
};

inicio();