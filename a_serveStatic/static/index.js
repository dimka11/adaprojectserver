document.addEventListener('DOMContentLoaded', () => {
    d3_chart();
    document.getElementById("csv_button").addEventListener("click", ()=> {
        fetch('./extra').then((response)=>  response.text())
        .then((text) => document.getElementById('list').innerHTML = text);
    });
}
, false)