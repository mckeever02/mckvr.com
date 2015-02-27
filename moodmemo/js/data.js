var chart;
 $(document).ready(function() {
        var cursan = {
   chart: {
    renderTo: 'sales',
    defaultSeriesType: 'area',
    marginRight: 10,
    marginBottom: 20
   },
   title: {
    text: 'Highchart With Mysql',
   },
   subtitle: {
    text: 'www.spjoshis.blogspot.com',
   },
   xAxis: {
    categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
   },
   yAxis: {
    title: {
     text: 'Average'
    },
    plotLines: [{
     value: 0,
     width: 1,
     color: '#808080'
    }]
   },
   tooltip: {
       crosshairs: true,
                shared: true
   },
   legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -10,
    y: 30,
    borderWidth: 0
   },

            plotOptions: {

                series: {
                    cursor: 'pointer',
                    marker: {
                        lineWidth: 1
                    }
                }
            },

         series: [{
       color: Highcharts.getOptions().colors[2],
    name: 'Test Colomn',
                marker: {
                    fillColor: '#FFFFFF',
                    lineWidth: 3,
                    lineColor: null // inherit from series
                },
                dataLabels: {
                    enabled: true,
                    rotation: 0,
                    color: '#666666',
                    align: 'top',
                    x: -10,
                    y: -10,
                    style: {
                        fontSize: '9px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 0px black'
                    }
                }
   }],
        }

        //Fetch MySql Records
        jQuery.get('values.php', null, function(tsv) {
   var lines = [];
   traffic = [];
   try {
    // split the data return into lines and parse them
    tsv = tsv.split(/\n/g);
    jQuery.each(tsv, function(i, line) {
     line = line.split(/\t/);
     date = line[0] ;
                                        amo=parseFloat(line[1].replace(',', ''));
                                        if (isNaN(amo)) {
                                                   amo = null;
                                        }
     traffic.push([
      date,
      amo
     ]);
    });
   } catch (e) {  }
   cursan.series[0].data = traffic;
   chart = new Highcharts.Chart(cursan);
  });
 });
