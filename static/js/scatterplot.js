//testing
//d3.select("div.article-style").append("p").text("Yo my dude");
//console.log(d3)

var margin = {top: 20, right: 20, bottom: 60, left: 60},
    width = 650 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]);
var y = d3.scaleLinear() 
    .range([height, 0]);

var xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

var cValue = function(d) { return d.Team;},
    color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("div#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.call(d3.zoom().on("zoom", function () {
    //  svg.attr("transform", d3.event.transform)
    //}))
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("div#chart").append("div")
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("opacity", 0.);

d3.csv("/data/NHL_PIT-DET-EDM_OGVT_2016-17.csv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.CapHit; }));
  y.domain(d3.extent(data, function(d) { return d.OGVT; }));
  
  svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)

  // text label for the x axis
  svg.append("text")             
	.attr("transform",
              "translate(" + (width/2) + " ," + 
                           (height + margin.top + 30) + ")")
	.style("text-anchor", "middle")
	.text("Date")
	.text("Salary Cap Hit (1M USD)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "0.7em")
      .style("text-anchor", "middle")
      .text("Offensive Goals vs. Threshold");

  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", "0.25em")
      .attr("cx",  function(d) { return x(d.CapHit); })
      .attr("cy",  function(d) { return y(d.OGVT); })
      .style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) {
          tooltip.transition()
            .duration(100)
            .style("opacity", 0.95);
          tooltip.html(d.LastName
                      + " (" + d.Position + ") "
                      + "<em>" + d.Team + "</em>"
                      + " ($" + d.CapHit + "M, "
                      + d.OGVT + " OGVT)")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
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
      .attr("x", width + margin.right-4)
      .attr("y", height - 80 + 8)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function (d) { return d; });

  svg.append("text")
      .attr("text-anchor", "middle") 
      .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)") 
      .text("OGVT")

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

});

function type(d) {
  d.CapHit = d.CapHit/1.e6;
  d.OGVT = +d.OGVT;
  return d;
}

