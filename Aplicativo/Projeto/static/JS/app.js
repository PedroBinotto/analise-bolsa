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
    cab = ['Ação', 'Valor total'];
    json_array.push(cab);

    for (var j = 0; j < json.length; j++) { // Elementos [1] e [4]
    var array2 = [0, 3];
    json[j] = array2.map(i => json[j][i]);

    json_array.push(json[j]);
    }
}
    
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    if (json_array.length < 2) {
        var apology = document.getElementById('chart_div');
        apology.innerHTML += '';
        return;
    }

    var data = google.visualization.arrayToDataTable(json_array);

    var options = {
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

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    var btnSave = document.getElementById('save-pdf');

    google.visualization.events.addListener(chart, 'ready', function () {
        btnSave.disabled = false;
    });

    btnSave.addEventListener('click', function () {
        var hght = $('#print').height();
        console.log(hght);
        var wdth = $(window).width();
        console.log(wdth);
        var doc = new jsPDF({
            unit: 'px',
            format: [hght, wdth]
        });
        canvas = chart.getImageURI();
        doc.addImage(canvas, 0, 0,);
        doc.save('chart.pdf');
    }, false);

    chart.draw(data, options);
}

/*
{
    orientation: 'landscape',
    unit: 'in',
    format: [4, 2]
}
*/