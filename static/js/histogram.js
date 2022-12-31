const container = document.getElementById("myJson");

// Get the path to the JSON file from the data-json-path attribute
const jsonPath = $("#myJson").data("json-path");


// Material Design color palette (RGB values)
const colorPalette = [
    'rgb(31, 119, 180)', // blue
    'rgb(255, 127, 14)', // orange
    'rgb(44, 160, 44)', // green
    'rgb(214, 39, 40)', // red
    'rgb(148, 103, 189)', // purple
    'rgb(140, 86, 75)', // brown
    'rgb(227, 119, 194)', // pink
    'rgb(127, 127, 127)', // gray
    'rgb(188, 189, 34)', // yellow
    'rgb(23, 190, 207)'  // light blue
  ];

// Function to filter the data based on the selected results
function filterHistogramData(selectedResults) {
    // Load the data from the JSON file
    console.log('Loading data from:', jsonPath);
    fetch(jsonPath)
      .then(response => response.json())
      .then(data => {
        console.log('Data loaded:', data);
        const labels = selectedResults;
        const filteredData = {
          labels: data.labels,
          datasets: data.datasets.filter(dataset => labels.includes(dataset.label))
        };
        console.log('selectedResults:', selectedResults);
        // Get the colors for the datasets
        let datasetColors = generateColors(filteredData, colorPalette);
        // Create the chart
        createChart(filteredData, datasetColors);
    });
  }

// Generate colors for the datasets
function generateColors(data, colors) {
    // If the data is an array, we need to generate colors for each dataset
    if (Array.isArray(data)) {
        console.log('data is an array');
        console.log('data:', data);
        console.log('colors:', colors);


        return data.map((dataset, i) => {
            // If the dataset has a color, use it
            if (dataset.backgroundColor) {
                return dataset.backgroundColor;
            }
            // Otherwise, generate a color
            return colors[i % colors.length];
        });
    }
    // If the data is an object, we need to generate colors for each label
    if (typeof data === 'object') {
        labels = data.labels;
        return data.labels.map((label, i) => colors[i % colors.length]);
    }
    // Otherwise, we need to generate a single color
    return colors[0];
}

// Create the chart
function createChart(data, colors) {
    // Get the context of the canvas element we want to select
    const ctx = document.getElementById('myChart').getContext('2d');
    // Generate colors for the datasets
    const datasetColors = generateColors(data, colors);
    // Create the chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: data.datasets.map((dataset, i) => ({
                label: dataset.label,
                data: dataset.data,
                backgroundColor: datasetColors[i],
                categoryPercentage: 1.0,
                barPercentage: 1.0,
            }))
        },  
        options: {
            responsive: true,
            maintainAspectRatio: false,
            barSpacing: 0,
            stacked: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: value => value % 1 === 0 ? value : null
                    }
                }],
            },
            legend: {
                display: true,
                position: 'bottom',
                generateLabels: chart => {
                    const labels = chart.data.labels;
                    const datasets = chart.data.datasets;
                    //
                    return labels.map((label, i) => {
                        const meta = chart.getDatasetMeta(0);
                        const style = meta.controller.getStyle(i);
                        return {
                            text: `${label} (${style.backgroundColor})`,
                            fillStyle: style.backgroundColor,
                            strokeStyle: style.borderColor,
                            lineWidth: style.borderWidth,
                            //hidden: isNaN(datasets[0].data[i]) || meta.data[i].hidden,
                            index: i
                        };
                    });
                }
            },
            elements: {
                // Apply the colors to the rectangles
                rectangle: {
                    backgroundColor: datasetColors,
                    borderColor: datasetColors,
                    borderWidth: 1,
                }
            }
        }
    });
}

// Listen for the selectedResultsChanged event
document.addEventListener('selectedResultsChanged', function (e) {
    const selectedResults = e.detail;
    filterHistogramData(selectedResults);
    console.log('selectedResultsChanged:', selectedResults);
});

// Path: static/js/histogram.js







