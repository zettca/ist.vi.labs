var
  margin = { top: -5, right: -5, bottom: -5, left: -5 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var drag = d3.drag()
  .subject(d => d)
  .on("start", dragStarted)
  .on("drag", dragged)
  .on("end", dragEnd);

function dragStarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this)
    .attr("cx", d.x = d3.event.x)
    .attr("cy", d.y = d3.event.y);
}

function dragEnd(d) {
  d3.select(this).classed("dragging", false);
}

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.right + ")");

var rect = svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all");

var container = svg.append("g");

container.append("g")
  .attr("class", "x axis")
  .selectAll("line")
  .data(d3.range(0, width, 10))
  .enter().append("line")
  .attr("x1", (d) => d)
  .attr("y1", 0)
  .attr("x2", (d) => d)
  .attr("y2", height);

container.append("g")
  .attr("class", "y axis")
  .selectAll("line")
  .data(d3.range(0, height, 10))
  .enter().append("line")
  .attr("x1", 0)
  .attr("y1", (d) => d)
  .attr("x2", width)
  .attr("y2", (d) => d);

d3.tsv("dots.tsv").then(function (dots) {
  dot = container.append("g")
    .attr("class", "dot")
    .selectAll("circle")
    .data(dots)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .call(drag);
});

function dottype(d) {
  d.x = +d.x;
  d.y = +d.y;
  return d;
}
