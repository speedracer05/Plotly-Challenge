// select userinput field
var select = d3.select("#selDataset")

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
    console.log(select)
});
}