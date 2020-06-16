$(document).ready(function () { // Inicializar jQuery após carregar o documento
    load();
});

var json_array = [];

function load() {   // Determinar o número de campos de pesquisa
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

function createControll(NoOfRec) {  // Gerar campo de pesquisa
    var tbl = "";

    tbl = "<table class='table table-bordered table-hover'>"+   // Cabeçalho
                "<tr class='table_header'>"+
                    "<th> No </th>"+
                    "<th> Símbolo </th>"+
                    "<th> Quantidade </th>"+
                "</tr>";

    for (i = 1; i <= NoOfRec; i++) {
        tbl += "<tr>" +                                         // Informaçôes
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
    "<label for='convert' class='custom-label'>" +
        "<input type='checkbox' name='convert' value='convert'>" +  // Checkbox para conversão
        "<span class='checkmark'></span>" +
        "Converter valores estrangeiros para BRL" +
    "</label>" +
    "<br>" +
    "<input type='submit' value='OK' class='button'>";          // Botão enviar

    $("#AddControll").append(tbl);                              // Adicionar campo
}

function jsonData(json) {   // Carregar dados passados pelo python (JSON{})
    cab = ['Ação', 'Valor total'];
    json_array.push(cab);

    for (var j = 0; j < json.length; j++) { // Elementos [1] e [4]
    var array2 = [0, 3];
    json[j] = array2.map(i => json[j][i]);

    json_array.push(json[j]);
    }
}
    
google.charts.load('current', {'packages':['corechart']});  // Importar API Google Charts
google.charts.setOnLoadCallback(drawChart);

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {  // Gerar gráfico de setores
    if (json_array.length < 2) {
        var apology = document.getElementById('chart_div');
        apology.innerHTML += '';
        return;
    }

    var data = google.visualization.arrayToDataTable(json_array);

    var options = { // Parâmetros do gráfico
    title: 'Análise Superficial',
    pieHole: 0.4,
    chartArea: {
        height: '94%',
        width: '100%'
    },
    width: '100%',
    height: 800,
    legend: {
        alignment: 'center',
        position: 'bottom'
    }
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));    //Varíaveis para gerar PDF
    var btnSave = document.getElementById('save-pdf');

    google.visualization.events.addListener(chart, 'ready', function () {
        btnSave.disabled = false;
    });

    btnSave.addEventListener('click', function () {
        
        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
            return true
            }
        };

        var hght = $('#print').height();

        var doc = new jsPDF({   // Dimensionar documento
            unit: 'px',
            format: [hght, hght]
        });

        margins = {
            top: (hght * 0.5),
            bottom: ((hght-522)*0.2),
            left: ((hght-522)*0.2),
            right: ((hght-522)*0.2),
            width: 522
        };

        source = $('#tabela')[0];       // Incluir tabela de informações
        canvas = chart.getImageURI();
        doc.addImage(canvas, 0, 0,);    // Incluir gráfico
        doc.fromHTML(                   // Alinhar elementos
            source,
            margins.left,
            margins.top, {
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            }
        );
        doc.save('chart.pdf');  // Salvar documento
    }, false);

    chart.draw(data, options);
}
