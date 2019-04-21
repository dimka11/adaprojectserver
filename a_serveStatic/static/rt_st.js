var lineArr = [];
    var MAX_LENGTH = 10;
    var duration = 500;
    var chart = realTimeLineChart();

    async function getData() {
      let d;
      await fetch('./getRealTimeData').then((response) => response.json()
    .then((data) => {
      d = data;
    }));
      return d;
    }

    async function seedData() {
      var now = new Date();
      for (var i = 0; i < MAX_LENGTH; ++i) {
        let data = await getData();

        if (typeof(data) == "undefined"){
          data = {};
          data.x = 0;
          data.y = 0;
          data.z = 0;
        }

        lineArr.push({
          time: new Date(now.getTime() - ((MAX_LENGTH - i) * duration)),
          x: data.x,
          y: data.y,
          z: data.z
        });
      }
    }

    async function updateData() {
      var now = new Date();
      let data = await getData();

        if (typeof(data) == "undefined"){
          data = {};
          data.x = 0;
          data.y = 0;
          data.z = 0;
        }

      var lineData = {
        time: now,
        x: data.x,
        y: data.y,
        z: data.z
      };
      lineArr.push(lineData);

      if (lineArr.length > 30) {
        lineArr.shift();
      }
      d3.select("#chart").datum(lineArr).call(chart);
    }

    function resize() {
      if (d3.select("#chart svg").empty()) {
        return;
      }
      chart.width(+d3.select("#chart").style("width").replace(/(px)/g, ""));
      d3.select("#chart").call(chart);
    }

    document.addEventListener("DOMContentLoaded", function() {
      seedData();
      window.setInterval(updateData, 250);
      d3.select("#chart").datum(lineArr).call(chart);
      d3.select(window).on('resize', resize);
    });