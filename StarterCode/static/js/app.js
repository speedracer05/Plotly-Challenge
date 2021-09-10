// select userinput field
var select = d3.select("#selDataset")
console.log(select)

// Create function to get data from JSON file
function int() {

  d3.json("samples.json").then((response) => {
    var names = response.names;

    names.forEach(name => {

      select.append("option")
        .text(name)
        .property("value", name);
    });

    buildMetadata(names[0]);
    buildCharts(names[0]);
    buildGauge(names[0]);
});
}

function buildMetadata(sample) {

    d3.json("samples.json").then((response) => {
        var metadata = response.metadata;
        var filteredData = metadata.filter(meta => meta.id == sample)[0];

        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(filteredData).forEach(([key, value]) => {
            panel.append("p")
                .text(`${key}: ${value}`);
        });
    });
}
function buildCharts(sample) {
  d3.json("samples.json").then((response) => {
      var samples = response.samples;
      var sampleData = samples.filter(button => button.id == sample)[0];

     // Create bar chart 
      var data = [{
          type: 'bar',
          x: sampleData.sample_values.slice(0, 10).reverse(),
          y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
          text: sampleData.otu_labels.slice(0, 10).reverse(),
          orientation: 'h'
      }];
    });
}