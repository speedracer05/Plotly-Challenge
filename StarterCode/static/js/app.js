
// select html userinput field
var select = d3.select("#selDataset")
console.log(select);

// Fetch, read JSON file; store data to variable; 
d3.json("samples.json").then((response) => { 
  var names = response.names;

  // Loop to populate Test Subject with id#s
  names.forEach(name => {
    select.append("option")
      .text(name)
      .property("value", name);
  });

  // Define function names to be used later; start at index 0
  buildMetadata(names[0]);
  buildCharts(names[0]);
  buildGauge(names[0]);
});

/* Collect demographic data; loop over object; create a new paragraph for
each key/value--for demographics panel */
function buildMetadata(sample) {
  d3.json("samples.json").then((response) => {
      var metadata = response.metadata;
      var siftData = metadata.filter(meta => meta.id == sample)[0];
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
  d3.json("samples.json").then((response) => {
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
  };
  Plotly.newPlot('bubble', data2, layout2);
  var layout2 = {
    font: { color: "black", family: "Helvetica" },
    title: 'Bacteria Found in Belly Button: Bubble Chart',
    showlegend: false,
};

Plotly.newPlot('bubble', data2, layout2);
  });
}