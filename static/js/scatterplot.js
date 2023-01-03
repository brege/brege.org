var margin = {top: 20, right: 20, bottom: 50, left: 60},
    width = 650 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);
var y = d3.scaleLinear() 
    .range([height, 0]);

var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var xValue = function(d) { return d.CapHit;}, // data -> value
    xMap = function(d) { return x(xValue(d));}, // data -> display
    xAxis = d3.axisBottom(x);

var yValue = function(d) { return d.OGVT;}, // data -> value
    yMap = function(d) { return y(yValue(d));}, // data -> display
    yAxis = d3.axisLeft(y);

var cValue = function(d) { return d.Team;},
    color = d3.scaleOrdinal(d3.schemeCategory10);

// add the graph canvas to the body of the webpage
var svg = d3.select("#scatterplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



// load data
d3.csv("/data/NHL_PIT-DET-EDM_OGVT_2016-17.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.CapHit; }));
  y.domain(d3.extent(data, function(d) { return d.OGVT; }));
  
    // x-axis ticks
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("fill", "var(--primary)")
        .style("font-color", "var(--primary)  ");
    // x-axis line and ticks
    svg.selectAll(".tick line")
        .style("stroke", "var(--primary)");
    svg.selectAll(".domain")
        .style("stroke", "var(--primary)");
    // x-axis label
    svg.append("text")
        .attr("transform",
                "translate(" + (width/2) + " ," +
                                (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Salary Cap Hit ($M)")
        .style("fill", "var(--primary)");

    // y-axis ticks
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
        .style("fill", "var(--primary)");
    // y-axis line and ticks
    svg.selectAll(".tick line")
        .style("stroke", "var(--primary)");
    svg.selectAll(".domain")
        .style("stroke", "var(--primary)");
    // y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("OGVT")
        .style("fill", "var(--primary)");

    // draw dots
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", "0.35em")
      .attr("cx",  function(d) { return x(d.CapHit); })
      .attr("cy",  function(d) { return y(d.OGVT); })
      .style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) { 
        /* tooltip */
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
        tooltip.html(d.LastName + " - " + d.Team + " - " + d.Position + "<br/>Cap: $" + d.CapHit + "M<br/>OGvT: " + d.OGVT)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("background-color", "var(--theme)")
            .style("color", "var(--primary)")
            .style("opacity", 0.9)
            .style("position", "absolute")
            .style("padding", "10px")
            .style("border-radius", "var(--radius)");

      })
      .on("mouseout", function(d) {
          tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });

  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(-100," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width + margin.right)
      .attr("y", height - 80)
      .attr("width", 40)
      .attr("height", 14)
      .style("fill", color);

    // draw legend text
    legend.append("text")
        .attr("x", width + margin.right + 50)
        .attr("y", height - 70)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d;})
        .style("fill", "var(--primary)");


    function transform(d) {
    return "translate(" + x(d.CapHit) + "," + y(d.OGVT) + ")";
    }

    function zoomed() {
    x.domain(d3.event.transform.rescaleX(x2).domain());
    y.domain(d3.event.transform.rescaleY(y2).domain());
    zoom();
    }


    function zoom() {  
    var t = d3.event.transform;
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
    svg.selectAll("circle")
        .attr("transform", transform);
    }

});

function type(d) {
  d.CapHit = d.CapHit/1.e6;
  d.OGVT = +d.OGVT;
  return d;
}