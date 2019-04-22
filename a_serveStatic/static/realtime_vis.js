let current_value = 0;
let update_timeout = 100;

document.addEventListener('DOMContentLoaded', () => {
  let graph_div = document.getElementById('graph');
  let second_graph_div = document.getElementById('second_graph');
  let third_graph_div = document.getElementById('third_graph');

  showCurrentValue(update_timeout);
  //plotGraph(graph_div);
  plotSecondGraph(second_graph_div);
  //plotThirdGraph(third_graph)

})

function getDataX() {
  return current_value.x
};

function getDataY() {
  return current_value.y
};

function getDataZ() {
  return current_value.z
};

function getDataM() {
  return Math.sqrt(current_value.x * current_value.x + current_value.y * current_value.y + current_value.z * current_value.z)
};

function plotGraph(graph_div) {
  let UPDATE_INTERVAL = 100;

  Plotly.plot(graph_div, [{
    y: [1, 2, 3].map(getDataX),
    name: 'x',
    mode: 'lines',
    line: { color: '#80CAF6' }
  }, {
    y: [1, 2, 3].map(getDataY),
    name: 'y',
    mode: 'lines',
    line: { color: '#DF56F1' }
  }, {
    y: [1, 2, 3].map(getDataZ),
    name: 'y',
    mode: 'lines',
    line: { color: '#4D92E9' }
  }]);

  var cnt = 0;

  var interval = setInterval(function () {
    var time = new Date();

    Plotly.extendTraces(graph_div, {
      y: [[getDataX()], [getDataY()], [getDataZ()]]
    }, [0, 1, 2])

    cnt = cnt+1;
    if (cnt === 5000) clearInterval(interval);
  }, UPDATE_INTERVAL);

};

function plotSecondGraph(second_graph_div) {

  let UPDATE_INTERVAL = 500;

  var time = new Date();

  var data = [{
    x: [time],
    y: [getDataM],
    mode: 'lines',
    line: {color: '#80CAF6'}
  }]

  Plotly.plot(second_graph_div, data);

  var cnt = 0;

  var interval = setInterval(function () {

    var time = new Date();

    

    var update = {
      x: [[time]],
      y: [[getDataM()]]
    }

    var olderTime = time.setMinutes(time.getMinutes() - 1);
    var futureTime = time.setMinutes(time.getMinutes() + 1);

    var minuteView = {
      xaxis: {
        type: 'date',
        range: [olderTime, futureTime]
      }
    }

    Plotly.relayout(second_graph_div, minuteView);
    Plotly.extendTraces(second_graph_div, update, [0])

    cnt = cnt+1;
    if (cnt === 100) clearInterval(interval);
  }, UPDATE_INTERVAL);
};

function plotThirdGraph(third_graph_div) {
  var time = new Date();

var trace1 = {
  x: [],
  y: [],
  mode: 'lines',
  name: 'x',
  line: {
    color: '#80CAF6',
    shape: 'spline'
  }
}

var trace2 = {
  x: [],
  y: [],
  xaxis: 'x2',
  yaxis: 'y2',
  mode: 'lines',
  name: 'y',
  line: {color: '#DF56F1'}
}
var trace3 = {
  x: [],
  y: [],
  xaxis: 'x3',
  yaxis: 'y3',
  mode: 'lines',
  name: 'z',
  line: {color: '#4D92E9'}
};

var layout = {
  xaxis: {
    type: 'date',
    domain: [0, 1],
    showticklabels: false
  },
  yaxis: {domain: [0.777,1]},
  xaxis2: {
    type: 'date',
    name: 'y',
    anchor: 'y3',
    domain: [0, 1]
  },
  yaxis2: {
    anchor: 'x2',
    domain: [0.333, 0.777]},
  xaxis3: {
    type: 'date',
    name: 'z',
    anchor: 'y3',
    domain: [0, 1]
  },
  yaxis3: {
    anchor: 'x3',
    domain: [0, 0.333]},
}

var data = [trace1, trace2, trace3];

Plotly.plot(third_graph_div, data, layout);

var cnt = 0;

var interval = setInterval(function() {

  var time = new Date();

  var update = {
    x: [[time], [time], [time]],
    y: [[getDataX()], [getDataY()], [getDataZ()]]
  }

  Plotly.extendTraces(third_graph_div, update, [0,1,2])


cnt = cnt + 1;
  if(cnt === 5000) clearInterval(interval);
}, 100);
};

function showCurrentValue(timeout) {
  setInterval(fetch_request_realtime_data, timeout);
}

function fetch_request_realtime_data() {
  fetch('./getRealTimeData').then((response) => response.json()
    .then((data) => {
      let text = JSON.stringify(data);
      current_value = data;
      updateCurrentData(text);
      return data;
    }));
}

function updateCurrentData(text) {
  document.getElementById("current_data").innerHTML = text;
}