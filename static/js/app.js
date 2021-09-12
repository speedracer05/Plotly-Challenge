
// select html userinput field
var select = d3.select("#selDataset");
// console.log(select)

// Create function. First instance populates dropdown menu with IDs, takes first ID and draws charts
function init() {

  // Fetch, read JSON file; store data to variable; 
  d3.json("data/samples.json").then((response) => { 
    var names = response.names;

    // Dropdown menu populated with id#s
    names.forEach(name => {
      select.append("option")
        .text(name)
        .property("value", name);
    });

    // Define function names to be used later;
    buildMetadata(names[0]);
    buildCharts(names[0]);
    buildGauge(names[0]);    /////////****** To complete later ******////////
  }); // close .then() promise

} // close init() function

/* Collect demographic data; loop over object; create a new paragraph for
each key/value--for demographics panel */
function buildMetadata(sample) {

  console.log(sample)
  d3.json("data/samples.json").then((response) => {
      var metadata = response.metadata;
      var siftData  = metadata.filter(meta => meta.id == sample)[0];
      console.log(siftData);

      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(siftData).forEach(([key, value]) => {
        panel.append("p")
          .text(`${key}: ${value}`);
      });
  });
}

// Collect Samples data; var SampleData to be used for bar and bubble charts
function buildCharts(sample) {

  d3.json("data/samples.json").then((response) => {
    var samples = response.samples;
    var sampleData = samples.filter(button => button.id == sample)[0];

    // Create bar chart with hover text; retrieve first 10 items; set chart horizontal
    // Source: https://plotly.com/javascript/bar-charts/#bar-chart-with-hover-text
    var data = [{
      type: 'bar',
      x: sampleData.sample_values.slice(0, 10).reverse(),
      y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: sampleData.otu_labels.slice(0, 10).reverse(),
      orientation: 'h',
      marker: {
        color: 'rgb(62,87,150)'
      }
    }];
    Plotly.newPlot('bar', data);

    // Create bubble chart
    // Source: https://plotly.com/javascript/bubble-charts/#hover-text-on-bubble-charts
    var trace1 = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      mode: 'markers',
      text: sampleData.otu_labels,
      marker: {
        color: sampleData.otu_ids,
        size: sampleData.sample_values,
        colorscale: 'Portland'
      }
    };

    var data2 = [trace1];
    var layout2 = {
      font: { color: "black", family: "Helvetica" },
      title: 'Bacteria Found in Belly Button: Bubble Chart',
      showlegend: false,
      xaxis: { title: "OTU ID"},
      yaxis: {title: "Sample Value"}
    };


  Plotly.newPlot('bubble', data2, layout2);
  
  });
}


    // Advanced Challenge Assignment (Optional) 
    // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ 
    // to plot the weekly washing frequency of the individual.
function buildGauge(sample) {

  d3.json("data/samples.json").then((response) => {
  var metadata = response.metadata;
  var washData = metadata.filter(wash => wash.id == sample)[0];

  console.log(washData.wfreq)

    var data3 = {
        type: "indicator",
        mode: "gauge+number+delta",
        value: washData.freq,
        title: { text: "Belly Button Wash Frequency: Number of Washes", font: { size: 20 } },
        delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: "#0df2ff" },
            { range: [1, 2], color: "#26d9ff" },
            { range: [2, 3], color: "#4cb2ff" },
            { range: [3, 4], color: "#738cff" },
            { range: [4, 5], color: "#9966ff" },
            { range: [5, 6], color: "#b24dff" },
            { range: [6, 7], color: "#cc33ff" },
            { range: [7, 8], color: "#e619ff" },
            { range: [8, 9], color: "#ff00ff" },
          ],
          // threshold: {
          //   line: { color: "red", width: 4 },
          //   thickness: 0.75,
          //   value: 490
          // }
        }
    };
    var data3 = [trace]
    var layout3 = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };

    Plotly.newPlot('gauge', data3, layout3);
  });
};
function optionChanged(newSample) {

  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
}

init();