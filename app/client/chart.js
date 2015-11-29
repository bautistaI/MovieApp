Template.charts.rendered = function(){
    new Chartist.Bar('.ct-chart', {
    labels: ['The Good Dinosaur', 'Spectre', 'Hunger Games', 'Creed', 'The Peanuts Movie'],
    series: [
      [2.5, 4, 5, 9, 8]
    ]
  }, {
    reverseData: true,
    horizontalBars: false,
    axisY: {
      offset: 50,
      onlyInteger: true
    }
  });
};

// ====== USES GOOGLE CHARTS API - I LIKE CHARTIST BETTER :) =========
// Template.charts.rendered = function(){
//   // Load the Visualization API and the piechart package.
//   google.load('visualization', '1.0', {'packages':['corechart']});

//   // Set a callback to run when the Google Visualization API is loaded.
//   google.setOnLoadCallback(drawChart);

//   // Callback that creates and populates a data table,
//   // instantiates the pie chart, passes in the data and
//   // draws it.
//   function drawChart() {
//   // Create the data table.
//       var data = google.visualization.arrayToDataTable([
//         ['Movie', 'Millions', { role: 'style' }],
//         ['The Good Dinosaur', 3, '#9b59b6'],
//         ['Spectre', 1.5, '#3498db'],
//         ['Hunger Games', 4.5, '#e67e22'],
//         ['Creed', 2.5, '#c0392b'],
//         ['The Peanuts Movie', 3.5, '#f1c40f']
//       ]);
   

//     // Set chart options
//     var options = {
//       'title':'Weekend Box Office',
//       'width':1200,
//       'height':500
//     };

//     // Instantiate and draw our chart, passing in some options.
//     var chart = new google.visualization.ColumnChart(document.getElementById('chart1'));
//           chart.draw(data, options);
//   }
// };