document.addEventListener('DOMContentLoaded', () => {
    let filepathes_array = ["./extra/acc.csv", "./extra/ACCELEROMETER.csv", "./extra/16.csv", "./extra/15.csv", "./extra/14.csv", "./extra/13.csv", "./extra/12.csv"];
    let current_filename_index = 0;
    plotly_basic(filepathes_array[current_filename_index]);
    update_current_file_name();
    document.getElementById("prev").addEventListener("click", () => {
        increaseCurrentIndex(false);
        update_current_file_name();
        plotly_basic(filepathes_array[current_filename_index]);
    });
    document.getElementById("next").addEventListener("click", () => {
        increaseCurrentIndex(true);
        update_current_file_name();
        plotly_basic(filepathes_array[current_filename_index]);
    });

    document.getElementById("csv_button").addEventListener("click", () => {
        fetch('./extra').then((response) => response.text())
            .then((text) => document.getElementById('list').innerHTML = text);
    });

    //d3_chart();
    //plotly_chart();

    function increaseCurrentIndex(cond) {
        if (cond === true) {
            if (current_filename_index === filepathes_array.length - 1) {
                current_filename_index = 0;
            }
            current_filename_index++;
        }
        else {
            if (current_filename_index === 0) {
                current_filename_index = filepathes_array.length;
            }
            current_filename_index--;
        }
    }

    function update_current_file_name() {
        document.getElementById("filename_current").innerHTML = "filename: " + filepathes_array[current_filename_index];
    }
}
    , false);