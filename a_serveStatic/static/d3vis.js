function d3_chart() {
  // sample data array
  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#viz")  // container DIV to hold the visualization
    .data("./extra/acc.csv", { "filetype": "csv" })  // data to use with the visualization
    .id('y')
    .type("line")       // visualization type
    .y("x")         // key to use for y-axis
    .x("timestamp")
    .resize(true)          // key to use for x-axis
    .draw()             // finally, draw the visualization!
}

function plotly_chart() {
  var legend = ['x', 'y', 'z']

  Plotly.d3.csv('./extra/acc.csv', (err, rows) => {

    var data = legend.map(y => {
      var d = rows

      return {
        type: 'line',
        name: y,
        x: d.map(r => r.timestamp),
        y: d.map(r => r.x)
      }
    })

    Plotly.newPlot('graph', data)
  })
}

function plotly_basic() {
  Plotly.d3.csv('./extra/acc.csv', function(err, rows){
    function unpack(rows, key) {
      return rows.map(function(row) {return row[key]; });
    }

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: "x",
      x: unpack(rows, 'timestamp'),
      y: unpack(rows, 'x'),
      line: {
        color: '#FF8700',
        width: 3,
        shape: "spline"
      }
    }

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: "y",
      x: unpack(rows, 'timestamp'),
      y: unpack(rows, 'y'),
      line: {
        color: '#81827F',
        width: 3,
        shape: "spline"
      }
    }

    var trace3 = {
      type: "scatter",
      mode: "lines",
      name: "z",
      x: unpack(rows, 'timestamp'),
      y: unpack(rows, 'z'),
      line: {
        color: '#04824C',
        width: 3,
        shape: "spline"
      }
    }

    var data = [trace1, trace2, trace3];

    var layout = {
     // Put your visual settings here
      };


    Plotly.newPlot('graph', data, layout);

  })
}