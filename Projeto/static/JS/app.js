$(document).ready(function () {
    load();
});

var json_array = [];

function load() {
    //alert("Working...");
    $("#txtNoOfRec").focus();

    $("#btnNoOfRec").click(function () {
        $("#AddControll").empty();
        var NoOfRec = $("#txtNoOfRec").val();

        //alert("" + NoOfRec);

        if (NoOfRec > 0) {
            createControll(NoOfRec);
        }
    });    
}

function createControll(NoOfRec) {
    var tbl = "";

    tbl = "<table class='table table-bordered table-hover'>"+
                "<tr class='table_header'>"+
                    "<th> No </th>"+
                    "<th> Símbolo </th>"+
                    "<th> Quantidade </th>"+
                "</tr>";

    for (i = 1; i <= NoOfRec; i++) {
        tbl += "<tr>" +
                    "<td>" + i + "</td>" +

                    "<td>"+
                        "<input type='text' id='txtFName' name='symbol" + i + "'' placeholder='Ex: AAPL...' required>"+
                    "</td>"+

                    "<td>"+
                        "<input type='number' id='quantity' name='quantity" + i + "'' min='1' required>"+
                    "</td>"+
                "</tr>";
    }
    tbl += "</table>" +
    "<input type='submit' value='OK' class='button'>";

    $("#AddControll").append(tbl);
}

function jsonData(json) {
  console.log(json)
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
/*
var json_array = [];
titulo = ''


function jsonData(json) {
  cab = ['Hora'];
  if (json[0][0].localeCompare('p_id') == 0) {      // Tabela Prod.
    cab.push('Quantidade');
    titulo = 'Produção'
    json_array.push(cab);

    for (var j = 1; j < json.length; j++) { // Elementos [1] e [4]
      var array2 = [1, 4];
      json[j] = array2.map(i => json[j][i]);

      json[j][0] = json[j][0].replace("T", " ");
      json[j][0] = new Date(json[j][0].replace(/-/g,"/"));

      json_array.push(json[j]);
    }
  }

  else if (json[0][0].localeCompare('e_id') == 0) { // Tabela Eventos
    cab.push('Evento');
    titulo = 'Eventos'
    json_array.push(cab);

    for (var j = 1; j < json.length; j++) { // Elementos [1] e [3]
      var array2 = [1, 3];
      json[j] = array2.map(i => json[j][i]);

      json[j][0] = json[j][0].replace("T", " ");
      json[j][0] = new Date(json[j][0].replace(/-/g,"/"));

      json_array.push(json[j]);
    }
  }
}


// Draw the chart and set the chart values
function drawChart() {
  // Some raw data (not necessarily accurate)
  if (json_array.length < 2) {
    var apology = document.getElementById('chart_div');
    apology.innerHTML += '<h3 class="center apology">Sem resultados</h3>';
    return;
  }

  var data = google.visualization.arrayToDataTable(json_array);

  var options = {
    chartArea: {
      height: '94%',
      width: '94%'
    },
    width: '100%',
    height: 800,
    title: titulo,
    legend: { position: 'bottom' },
    explorer: {
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 4.0
    }
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
  }

*/