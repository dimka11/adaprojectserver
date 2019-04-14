function d3_chart() {
  // sample data array
  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#viz")  // container DIV to hold the visualization
    .data("./extra/acc.csv", {"filetype": "csv"})  // data to use with the visualization
    .type("line")       // visualization type
    .y("x")         // key to use for y-axis
    .x("timestamp")          // key to use for x-axis
    .draw()             // finally, draw the visualization!
}