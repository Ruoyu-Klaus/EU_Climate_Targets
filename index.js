
// -----------STAGE ONE----------- //
//Set SVG size for Stage 1 and 3 charts
var margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
},
    width = 810,
    height = 640;

var stage1Chart = d3.select(".timeline")
    .attr("viewBox", "0 0 " + width + " " + height) //making responsive? - resizes svg within window
    .attr("class", "mr-2")

var brexitBtn = d3.select("#brexitBtnForDesktop")
    .attr("fill", "#df9827")
    .attr("cursor", "pointer")
    .on("click", function () {
        document.getElementById("brexitBtnForMobile").click()
    })

// Append g to wrap up line chart
var stage1Wrapper = stage1Chart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("transform", "translate(30,85)")
    .attr("class", "graph-wrapper")

//Set x-axis scale
var xScale1 = d3.scaleTime()
    .domain([new Date("1990-01-01"), new Date("2050-01-01")])
    .range([0, 700]);

var dates = [new Date("1990-01-01"), new Date("2020-01-01"), new Date("2030-01-01"), new Date("2050-01-01")];

stage1Wrapper
    .selectAll('text')
    .data(dates)
    .enter()
    .append('text')
    .attr("fill", "#fef7ea")
    .attr("transform", "translate(-18,525)")
    .attr('x', function (d) {
        return xScale1(d);
    })
    .text(function (d) {
        var year = d3.timeFormat("%Y");
        return year(d);
    });

// Create x-axis
var xAxis1 = d3.axisBottom()
    .scale(xScale1);

// Append x-axis to svg
stage1Wrapper.append("g")
    .attr("transform", "translate(0,500)")
    .attr("class", "xAxis")
    .call(xAxis1);


//Set y-axis scale
var yScale1 = d3.scaleLinear()
    .domain([100, 0])
    .range([0, 500])

// Create y-axis
var yAxis1 = d3.axisRight()
    .scale(yScale1)
    .ticks(5)

// Append y-axis to svg
stage1Wrapper.append("g")
    .attr("transform", "translate(700,0)")
    .attr("class", "yAxis")
    .call(yAxis1);

// Create gridlines
var gridline1 = d3.axisRight()
    .tickFormat("")
    .tickSize(width - 110)
    .scale(yScale1)
    .tickValues([20, 40, 60, 80, 100]);

stage1Wrapper.append("g")
    .attr("class", "grid")
    .call(gridline1);

// Data for line & circles
var dataFigure1 = [{
    date: new Date("1990-01-01"),
    prop: 100
},
{
    date: new Date("2020-01-01"),
    prop: 80
},
]

// Data figure 2
var dataFigure2 = [{
    date: new Date("2020-01-01"),
    prop: 80
},
{
    date: new Date("2030-01-01"),
    prop: 60
},
]

// Data figure 3
var dataFigure3 = [{
    date: new Date("2030-01-01"),
    prop: 60
},
{
    date: new Date("2050-01-01"),
    prop: 0
},
]

var createFigures = function (data, name) {
    var shape = stage1Wrapper.append("g")
        .attr("class", name);
    shape.selectAll("circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale1(d.date);
        })
        .attr("cy", function (d) {
            return yScale1(d.prop);
        })
        .attr("r", 5)
        .attr("fill", "#df9827");

    shape.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#df9827")
        .attr("stroke-width", 2.5)
        .attr("d", d3.line()
            .x(function (d) {
                return xScale1(d.date)
            })
            .y(function (d) {
                return yScale1(d.prop)
            })
        )
}

createFigures(dataFigure1, "figure1")
createFigures(dataFigure2, "figure2")
createFigures(dataFigure3, "figure3")


// Data for projection shape 2020 - 2030
var projectionOne = [{
    date: new Date("2020-01-01"),
    prop: 80
},
{
    date: new Date("2030-01-01"),
    prop: 50
},
{
    date: new Date("2030-01-01"),
    prop: 55
}
];

// Data for projection shape 2030 - 2050
var projectionTwo = [{
    date: new Date("2030-01-01"),
    prop: 55
},
{
    date: new Date("2030-01-01"),
    prop: 50
},
{
    date: new Date("2050-01-01"),
    prop: 0
}
];

//Projection shape for new policy by 2030
var projectionShape1 =
    stage1Wrapper.append("path")
        .datum(projectionOne)
        .attr("class", "projection-shape1")
        .attr("fill", "#df9827")
        .attr("stroke", "#df9827")
        .style("opacity", 0.7)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) {
                return xScale1(d.date)
            })
            .y(function (d) {
                return yScale1(d.prop)
            })
        )

//Projection shape for new policy by 2050 following 2030 update
var projectionShape2 =
    stage1Wrapper.append("path")
        .datum(projectionTwo)
        .attr("class", "projection-shape2")
        .attr("fill", "#df9827")
        .attr("stroke", "#df9827")
        .style("opacity", 0.7)
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) {
                return xScale1(d.date)
            })
            .y(function (d) {
                return yScale1(d.prop)
            })
        )



// Date for meeting 2020 target annotation
var annotationDate = [{
    date: new Date("2017-01-01"),
    prop: 80
},
{
    date: new Date("2017-01-01"),
    prop: 0
}
];

stage1Wrapper
    .append("g")
    .attr("class", "annotation-line");

var annotationLine = d3.select('.annotation-line');

annotationLine
    .selectAll('circles')
    .data(annotationDate)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return xScale1(d.date);
    })
    .attr("cy", function (d) {
        return yScale1(d.prop);
    })
    .attr("r", 7)
    .attr("fill", "#fef7ea");

annotationLine.append("path")
    .datum(annotationDate)
    .attr("fill", "none")
    .attr("stroke", "#fef7ea")
    .attr("stroke-width", 3)
    .style("stroke-dasharray", ("3,3"))
    .attr("d", d3.line()
        .x(function (d) {
            return xScale1(d.date)
        })
        .y(function (d) {
            return yScale1(d.prop)
        })
    )


// Annotation: meeting 2020 target
const annotations = [{
    note: {
        label: "",
        title: "EU meets 20% reduction target back in 2017",
        wrap: 200,
    },
    color: ["#fef7ea"],
    x: 315,
    y: 100,
    dy: 120,
    dx: -50
}];

// Add annotation to the chart
const makeAnnotations = d3.annotation()
    .annotations(annotations)
stage1Wrapper
    .append("g")
    .call(makeAnnotations)



// -----------STAGE TWO----------- //

am4core.useTheme(am4themes_animated);
var chart = am4core.create("country-bar", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0;
chart.responsive.enabled = true;
chart.dataSource.url = "data/draggablebar_data.json";
chart.padding(40, 40, 0, 0);
chart.maskBullets = false; // allow bullets to go out of plot area


// category axis
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.minGridDistance = 10;
categoryAxis.renderer.labels.template.marginLeft = 40;
categoryAxis.renderer.labels.template.dx = -40;
categoryAxis.renderer.labels.template.fill = am4core.color("#fef7ea");



// value axis
var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
// we set fixed min/max and strictMinMax to true, as otherwise value axis will adjust min/max while dragging and it won't look smooth
valueAxis.strictMinMax = true;
valueAxis.min = -100;
valueAxis.max = 50;
valueAxis.renderer.minWidth = 60;
// valueAxis.renderer.grid.template.disabled = true;
valueAxis.renderer.labels.template.fill = am4core.color("#fef7ea");
valueAxis.renderer.line.strokeOpacity = 1;
valueAxis.renderer.line.strokeWidth = 1.5;
valueAxis.renderer.line.stroke = am4core.color("#fef7ea");
valueAxis.title.text = "% change in emissions from 1990 levels by country"
valueAxis.title.fill = am4core.color("#fef7ea")


// series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "name";
series.dataFields.valueX = "change";
series.sequencedInterpolation = true;
series.defaultState.interpolationDuration = 1500;
series.columns.template.strokeOpacity = 0;
series.columns.template.fill = am4core.color("#df9827");


// zero Line
var range = valueAxis.axisRanges.create();
range.value = 0;
range.grid.stroke = am4core.color("#fef7ea");
range.grid.strokeWidth = 2;
range.grid.strokeOpacity = 1;
range.grid.above = true;

// label bullet
var labelBullet = new am4charts.LabelBullet();
series.bullets.push(labelBullet);
labelBullet.label.text = "{valueX.value.formatNumber('#.')}";
labelBullet.strokeOpacity = 0;
labelBullet.label.fill = am4core.color("#fef7ea");
labelBullet.stroke = am4core.color("#fef7ea");
labelBullet.dy = 0;
labelBullet.dx = -24;
labelBullet.label.truncate = false;

// series bullet
var bullet = series.bullets.create();
bullet.stroke = am4core.color("#ffffff");
bullet.strokeWidth = 5;
bullet.opacity = 1; // initially invisible
bullet.defaultState.properties.opacity = 1;
bullet.dy = -8;
// resize cursor when over
bullet.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
bullet.draggable = true;
// create hover state
var hoverState = bullet.states.create("hover");
hoverState.properties.opacity = 1; // visible when hovered


// add circle sprite to bullet
var circle = bullet.createChild(am4core.Circle);
circle.fill = am4core.color("#888")
circle.opacity = 0.8
circle.radius = 5;


// while dragging
bullet.events.on("drag", event => {
    handleDrag(event);
});

bullet.events.on("dragstop", event => {
    var dataItem = event.target.dataItem;
    handleDrag(event);
    dataItem.column.isHover = false;
    event.target.isHover = false;
    var currentData = []
    series.dataItems.values.forEach(i => currentData.push(i.valueX));

    d3.json("/data/draggablebar_data.json").then((data) => {
        for (var i = 0; i < data.length; i++) {
            data[i].newChange = currentData[i];
            data[i].reducedEmissions = (1 + data[i].newChange / 100) * data[i][1990];
        }
        console.log(currentData)

        var euTotal = data.reduce((acc, cur, id) => {
            return acc + (cur.reducedEmissions);
        }, 0)
        const eu1990 = 5649529.342;
        let absoluteDifference = euTotal - eu1990;
        let euReduction = absoluteDifference / eu1990 * 100;

        createCircle(euReduction);
        // interactive tool context modal

        // context title
        let contextButton = document.getElementById("context-button");
        contextButton.style.display = "block";
        contextButton.style.outline = "none";
        let contextTitle = document.getElementById("context-title");

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        if (typeof euReduction === 'undefined') {
            var target = "Error";
        } else if (euReduction < -50 & euReduction > -55) {
            var target = "<b>met</b>";
        } else if (euReduction < -55) {
            var target = "<b>surpassed</b>"
        } else {
            var target = "<b>did not meet</b>";
        };
        if (typeof absoluteDifference === 'undefined') {
            var direction = "Error";
        } else if (absoluteDifference < 0) {
            var direction = "<b>reduced</b>";
        } else {
            var direction = "<b>increased</b>";
        };

        contextTitle.innerHTML = "You " + target + " the new EU 2030 target" + "<br>" + "You " + direction + " EU emissions by..." + "<br> <b>" + formatNumber(Math.round(Math.abs(absoluteDifference))) + " ktCO2" + "</b>";

        // context body
        let contextCar = document.getElementById("context-car");
        let contextPower = document.getElementById("context-power");
        let contextHome = document.getElementById("context-home");

        contextCar.innerHTML = "<b>" + Math.round(Math.abs(absoluteDifference) / 3 * 212 / 1000000) + " million" + "</b>" + " cars driven for one year <br> +"
        contextPower.innerHTML = "<b>" + Math.round(Math.abs(absoluteDifference) / 3 * 0.0003) + "</b>" + " power plants' production for one year <br>+"
        contextHome.innerHTML = "<b>" + Math.round(Math.abs(absoluteDifference) / 3 * 115 / 1000000) + " million" + "</b>" + " homes' energy use for one year"


    });
});


function handleDrag(event) {
    var dataItem = event.target.dataItem;
    // convert coordinate to value
    var value = valueAxis.xToValue(event.target.pixelX);
    // set new value
    dataItem.valueX = value;
    // make column hover
    dataItem.column.isHover = true;
    // hide tooltip not to interrupt
    dataItem.column.hideTooltip(0);
    // make bullet hovered (as it might hide if mouse moves away)
    event.target.isHover = true;
}

var columnTemplate = series.columns.template;
// when columns position changes, adjust minX/maxX of bullets so that we could only dragg vertically
columnTemplate.events.on("positionchanged", event => {
    var dataItem = event.target.dataItem;
    var itemBullet = dataItem.bullets.getKey(bullet.uid);
    var column = dataItem.column;
    itemBullet.minX = 0;
    itemBullet.maxX = chart.seriesContainer.pixelWidth;
    itemBullet.minY = column.pixelY + column.pixelHeight;
    itemBullet.maxY = itemBullet.minY;
});

// Eu chart 
var euChart = {
    width: 400,
    height: 350,
    margin: {
        left: 40,
        right: 10,
        top: 10,
        bottom: 50
    },
}
var overallEu = d3.select("#overall-eu")
    .append("svg")
    .attr("viewBox", "0 0 " + euChart.width + " " + euChart.height)
    .attr("class", "euChart")
    .append("g")
    .attr("class", "euChartWrapper")
    .attr("transform", "translate(" + euChart.margin.left + "," + euChart.margin.top + ")");

var euWidth = euChart.width - euChart.margin.left - euChart.margin.right;
var euHeight = euChart.height - euChart.margin.top - euChart.margin.bottom;

var euXscale = d3.scaleLinear()
    .range([0, euWidth])
    .domain([0, 2]);

var euYscale = d3.scaleLinear()
    .range([euHeight, 0])
    .domain([-80, 20]);

var euXaxis = d3.axisBottom(euXscale);
var euYaxis = d3.axisLeft(euYscale);

overallEu.append("g")
    .attr("transform", "translate(0," + euHeight + ")")
    .attr("class", 'x axis');

overallEu.append("g")
    .attr("class", "y axis")

var transition = d3.transition()
    .duration(1000)
    .ease(d3.easeQuadOut)
// Create gridlines
var euGridLine = d3.axisRight()
    .tickFormat("")
    .tickSize(euWidth - 110)
    .scale(euYscale)
    .tickValues([20, 0, -20, -40, -60, -80]);

overallEu.append("g")
    .attr("class", "grid")
    .call(euGridLine);

overallEu.append("text")
    .attr("y", "92.5%")
    .attr("x", "34%")
    .style("text-anchor", "middle")
    .style("fill", "#fef7ea")
    .style("font-size", "0.7em")
    .text("overall EU % change in emissions from 1990 levels");


overallEu.append("rect")
    .attr("x", euXscale(0))
    .attr("y", euYscale(-50))
    .attr("width", euXscale(1.4))
    .attr("height", euYscale(-55) - euYscale(-50))
    .style("fill", "#df9827")
    .style("opacity", 0.4)


overallEu.append("rect")
    .attr("x", euXscale(0))
    .attr("y", euYscale(-33))
    .attr("width", euXscale(1.4))
    .attr("height", euYscale(-48) - euYscale(-33))
    .style("fill", "#888")
    .style("opacity", 0.6)

overallEu.append("text")
    .attr("x", euXscale(0.9))
    .attr("y", euYscale(-39))
    .text("Current policy")
    .style("font-size", "0.6em")
    .style("opacity", 0.8)
    .style("fill", "#fef7ea")

overallEu.append("text")
    .attr("x", euXscale(0.9))
    .attr("y", euYscale(-44))
    .text("expectations")
    .style("font-size", "0.6em")
    .style("opacity", 0.8)
    .style("fill", "#fef7ea")


overallEu.append("text")
    .attr("x", euXscale(0.9))
    .attr("y", euYscale(-54))
    .text("New 50-55% target")
    .style("font-size", "0.6em")
    .style("opacity", 0.8)
    .style("fill", "#fef7ea")


function createCircle(y = -33) {
    var dots = overallEu.selectAll(".dot")
        .data([{
            x: 0.75,
            y: y,
        }])

    dots.exit()
        .transition(transition)
        .remove()

    var new_dots = dots.enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 20)
        .attr("fill", "#df9827")

    dots.merge(new_dots)
        .transition(transition)
        .attr("cx", function (d) {
            return euXscale(d.x);
        })
        .attr("cy", function (d) {
            return euYscale(d.y);
        })

    var euText = overallEu.selectAll(".euText")
        .data([{
            x: 0.75,
            y: y,
        }]);

    euText.exit()
        .transition(transition)
        .remove()

    var newText = euText.enter()
        .append("text")
        .attr("class", "euText")
        .attr("fill", "#fef7ea");
    newText.merge(euText)
        .text(Math.round(y))
        .transition(transition)
        .attr("x", function (d) {
            return euXscale(d.x) * 0.92;
        })
        .attr("y", function (d) {
            return euYscale(d.y) * 1.03;
        });


}
createCircle()

overallEu.select(".x.axis")
    .attr("opacity", 0)
    .call(euXaxis);
overallEu.select(".y.axis")
    .call(euYaxis);

function reset() {
    createCircle()
    chart.dataSource.url = "data/draggablebar_data.json";
    chart.dataSource.load()
}

const reset_btn = document.querySelector("#reset-button").addEventListener("click", reset)

// Interactive tool alternative for mobile
//Set SVG size
var widthMob = 340;
var heightMob = 540;

var margin = {
    top: 10,
    right: 20,
    left: 90,
    bottom: 50
};

var barMobile = d3.select(".bar-mobile")
    .attr("width", widthMob)
    .attr("height", heightMob)
    .attr("transform", "translate(0,5)");

var barMobileWrapper = barMobile
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "graph-wrapper");


widthMob = widthMob - margin.left - margin.right;
heightMob = heightMob - margin.top - margin.bottom;

//Set x-axis scale
var xScaleBarMob = d3.scaleLinear()
    .domain([-100, 50])
    .range([0, widthMob]);


// Create x-axis
var xAxisBarMob = d3.axisBottom()
    .scale(xScaleBarMob)
    .ticks(4);

// Append x-axis to svg
barMobileWrapper.append("g")
    .attr("transform", "translate(0," + heightMob + ")")
    .attr("class", "xAxisMob")
    .call(xAxisBarMob);


var needShow = function () {
    d3.selectAll(".expBar")
        .transition()
        .ease(d3.easeQuad)
        .duration(1000)
        .attr("width", function (d) {
            if (d.need_change < 0) {
                return xScaleBarMob(0) - xScaleBarMob(d.need_change);
            } else {
                return xScaleBarMob(d.need_change) - xScaleBarMob(0);
            }
        })
        .attr("x", function (d) {
            if (d.need_change < 0) {
                return xScaleBarMob(d.need_change);
            } else {
                return xScaleBarMob(0);
            }

        })
        .style("fill", "#df9827");
};

var expShow = function () {
    d3.selectAll(".expBar")
        .transition()
        .ease(d3.easeQuad)
        .duration(1000)
        .attr("width", function (d) {
            if (d.exp_change < 0) {
                return xScaleBarMob(0) - xScaleBarMob(d.exp_change);
            } else {
                return xScaleBarMob(d.exp_change) - xScaleBarMob(0);
            }
        })
        .attr("x", function (d) {
            if (d.exp_change < 0) {
                return xScaleBarMob(d.exp_change);
            } else {
                return xScaleBarMob(0);
            }
        })
        .style("fill", "#888");
};


d3.json("data/barMob.json")
    .then(function (data) {

        // console.log(data);

        //Set y-axis scale
        var yScaleBarMob = d3.scaleBand()
            .rangeRound([0, heightMob])
            .domain(data.map(function (d) {
                return d.country;
            }));

        // Create y-axis
        var yAxisBarMob = d3.axisLeft()
            .scale(yScaleBarMob);

        // Append y-axis to svg
        barMobileWrapper.append("g")
            .attr("class", "yAxis")
            // .attr("transform", "translate(" + xScaleBarMob(0) + ",0)")
            .call(yAxisBarMob);

        // Add 0 line
        barMobileWrapper.append("line")
            .attr("y1", 0)
            .attr("y2", heightMob)
            .attr("x1", xScaleBarMob(0))
            .attr("x2", xScaleBarMob(0))
            .attr("class", "zero-line");

        // Add 2030 current policy expectations bars
        barMobileWrapper.selectAll(".expBar")
            .data(data)
            .enter().append("rect")
            .attr("class", "expBar")
            .style("fill", "#888")
            .style("stroke", "white")
            .attr("height", yScaleBarMob.bandwidth())
            .attr("width", function (d) {
                if (d.exp_change < 0) {
                    return xScaleBarMob(0) - xScaleBarMob(d.exp_change);
                } else {
                    return xScaleBarMob(d.exp_change) - xScaleBarMob(0);
                }
            })
            .attr("y", function (d, i) {
                return yScaleBarMob(d.country);
            })
            .attr("x", function (d) {
                if (d.exp_change < 0) {
                    return xScaleBarMob(d.exp_change);
                } else {
                    return xScaleBarMob(0);
                }
            });

    });


// --------Bar chart race mobile alternative---------//
//Set SVG size
var widthIndustryMob = 340;
var heightIndustryMob = 540;

var margin = {
    top: 10,
    right: 20,
    left: 90,
    bottom: 20
};

var barIndustry = d3.select(".bar-industry-mobile")
    .attr("width", widthIndustryMob)
    .attr("height", heightIndustryMob)
    .attr("transform", "translate(0,5)");

var barIndustryWrapper = barIndustry
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "graph-wrapper");


widthIndustryMob = widthIndustryMob - margin.left - margin.right;
heightIndustryMob = heightIndustryMob - margin.top - margin.bottom;


//Set x-axis scale
var xScaleIndMob = d3.scaleLinear()
    .domain([0, 20])
    .range([0, widthIndustryMob]);

// Create x-axis
var xAxisIndMob = d3.axisBottom()
    .scale(xScaleIndMob)
    .tickFormat(d3.format("d"))
    .ticks(4);

barIndustryWrapper.append("g")
    .attr("transform", "translate(0," + heightIndustryMob + ")")
    .attr("class", "xAxisClothing")
barIndustryWrapper.append("g")
    .attr("class", "yAxisClothing")

d3.json("data/clothingData.json")
    .then(function (data) {

        var data1990 = [...data].sort(function (a, b) {
            // return d3.ascending(a.y1990, b.y1990);
            return b.y1990 - a.y1990
        });

        var data2005 = [...data].sort(function (a, b) {
            return b.y2005 - a.y2005
        });
        var data2012 = [...data].sort(function (a, b) {
            return b.y2012 - a.y2012
        });

        const but1990 = document.querySelector("#but1990");
        const but2005 = document.querySelector("#but2005");
        const but2012 = document.querySelector("#but2012");

        but1990.addEventListener("click", function () {
            updateUkBarChart(data1990, 'y1990')

            d3.select("#an1990")
                .transition()
                .style("opacity", 1)
                .duration(1000);

            d3.selectAll("#an2005, #an2012")
                .transition()
                .style("opacity", 0)
                .duration(1000);

        })
        but2005.addEventListener("click", function () {
            updateUkBarChart(data2005, 'y2005')

            d3.select("#an2005")
                .transition()
                .style("opacity", 1)
                .duration(1000);

            d3.selectAll("#an1990, #an2012")
                .transition()
                .style("opacity", 0)
                .duration(1000);

        })
        but2012.addEventListener("click", function () {
            updateUkBarChart(data2012, 'y2012')

            d3.select("#an2012")
                .transition()
                .style("opacity", 1)
                .duration(1000);

            d3.selectAll("#an1990, #an2005")
                .transition()
                .style("opacity", 0)
                .duration(1000);

        })

        function wrap(text, width) {
            text.each(function () {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    dy = 0, //parseFloat(text.attr("dy")),
                    tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
                    }
                }
            });
        }

        function updateUkBarChart(data, year) {

            // Append x-axis to svg
            barIndustryWrapper.select(".xAxisClothing")
                .call(xAxisIndMob);

            let transistion = d3.transition()
                .ease(d3.easeQuad)
                .duration(1000)

            // //Set y-axis scale
            var yScaleIndMob = d3.scaleBand()
                .rangeRound([0, heightIndustryMob])
                .domain(data.map(function (d) {
                    return d.region;
                }));

            // Create y-axis
            var yAxisIndMob = d3.axisLeft()
                .scale(yScaleIndMob);

            // Append y-axis to svg

            barIndustryWrapper.select(".yAxisClothing")
                .transition(transistion)
                .call(yAxisIndMob);

            barIndustryWrapper.selectAll(".yAxisClothing text")
                .attr("fill", "#fef7ea")
                .style("font-size", "0.8rem")

            // Add 0 line
            barIndustryWrapper.append("line")
                .attr("y1", 0)
                .attr("y2", heightIndustryMob)
                .attr("x1", xScaleIndMob(0))
                .attr("x2", xScaleIndMob(0))
                .attr("class", "zero-line");

            // Add 2030 current policy expectations bars
            var clothBars = barIndustryWrapper.selectAll(".clothBars")
                .data(data);

            clothBars.exit()
                .transition(transistion)
                .style("opacity", 0)
                .remove()

            var new_clothBars = clothBars
                .enter()
                .append("rect")
                .attr("class", "clothBars")
                .style("stroke", "white")
                .attr("height", yScaleIndMob.bandwidth())


            new_clothBars.merge(clothBars)
                .transition(transistion)
                .style("opacity", 1)
                .style("fill", function (d) {
                    if (d.category === "UK") {
                        return "#df9827";
                    } else {
                        return "#888";
                    }
                })
                .attr("width", function (d) {
                    return xScaleIndMob(d[year]);
                })
                .attr("y", function (d) {
                    return yScaleIndMob(d.region);
                })
                .attr("x", function (d) {
                    return xScaleIndMob(0);
                })



            // Annotations

            barIndustryWrapper.append("text")
                .attr("id", "an1990")
                .attr('x', xScaleIndMob(6))
                .attr('y', yScaleIndMob('Asia'))
                .style("fill", "#fef7ea")
                .style("opacity", 0)
                .text("In 1990, a lot of clothing was produced in the UK while imports came mostly from Europe and China")
                .call(wrap, (widthIndustryMob - xScaleIndMob(6)));

            barIndustryWrapper.append("text")
                .attr("id", "an2005")
                .attr('x', xScaleIndMob(3))
                .attr('y', yScaleIndMob('North America'))
                .style("fill", "#fef7ea")
                .style("opacity", 0)
                .text("Over the next fifteen years, UK clothing was increasingly produced abroad, with emissions from Chinese imports at its highest in 2005")
                .call(wrap, (widthIndustryMob - xScaleIndMob(3)));

            barIndustryWrapper.append("text")
                .attr("id", "an2012")
                .attr('x', xScaleIndMob(3))
                .attr('y', yScaleIndMob('North America'))
                .style("fill", "#fef7ea")
                .style("opacity", 0)
                .text("Since 2005, emissions from overseas products has declined, but still the majority of emissions from clothing consumed in the UK are counted towards other countries' statistics.")
                .call(wrap, (widthIndustryMob - xScaleIndMob(3)));
        };
        but1990.click()
    })




//----------STAGE THREE---------//
//----------UK consumption emissions versus production emissions chart-------------//

var stage3UKChart = d3.select(".UK_comparison_chart")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("class", "mr-2")
    .attr("class", "mt-5")

// Append g to wrap up line chart
var stage3UKWrapper = stage3UKChart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("transform", "translate(30,85)")
    .attr("class", "graph-wrapper")

//Set x-axis scale
var xScaleUKChart = d3.scaleTime()
    .domain([new Date("1990-01-01"), new Date("2020-01-01")])
    .range([0, 700]);

var dates = [new Date("1990-01-01"), new Date("2000-01-01"), new Date("2010-01-01"), new Date("2020-01-01")];

stage3UKWrapper
    .selectAll('text')
    .data(dates)
    .enter()
    .append('text')
    .attr("fill", "#fef7ea")
    .attr("transform", "translate(-18,525)")
    .attr('x', function (d) {
        return xScaleUKChart(d);
    })
    .text(function (d) {
        var year = d3.timeFormat("%Y");
        return year(d);
    });

// Create x-axis
var xAxisUKChart = d3.axisBottom()
    .scale(xScaleUKChart)
    .ticks(6)


// Append x-axis to svg
stage3UKWrapper.append("g")
    .attr("transform", "translate(0,500)")
    .attr("class", "xAxis")
    .call(xAxisUKChart);

//Set y-axis scale
var yScaleUKChart = d3.scaleLinear()
    .domain([1100, 0])
    .range([0, 500])

// Create y-axis
var yAxisUKChart = d3.axisRight() //Do we want axis right (like other graphs)?
    .scale(yScaleUKChart)
    .ticks(11)

// Append y-axis to svg
stage3UKWrapper.append("g")
    .attr("transform", "translate(700,0)")
    .attr("class", "yAxis")
    .call(yAxisUKChart);

//Append text label to svg
stage3UKWrapper.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("font-family", "HelveticaNeue-Light")
    .style("stroke", "#fef7ea")
    .text("Megatonnes CO2 equivalent");

// Create gridlines
var gridlineUKChart = d3.axisRight()
    .tickFormat("")
    .tickSize(width - 110)
    .scale(yScaleUKChart)
    .tickValues([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]);

stage3UKWrapper.append("g")
    .attr("class", "grid")
    .call(gridlineUKChart);


var createLine = d3.line()
    .x(function (d) {
        return x(d.dates);
    })
    .y(function (d) {
        return y(d.territorial_emissions);
    });

d3.csv("/data/UK_chart_data.csv").then(function (data) {

    data.forEach(function (d) {
        d.dates = +d.dates;
        d.territorial_emissions = +d.territorial_emissions;
        d.consumption_emissions = +d.consumption_emissions;
    })

    console.log("Uk chart", data)
});

// stage3UKWrapper.append("path")
//     .data(data)
//     .enter()
//     .attr("class", "line")
//     .attr("d", createLine(data))



//-----------CCA chart----------//
var stage3Chart = d3.select(".cca-chart")
    .attr("viewBox", "0 0 " + width + " " + 550)
    .attr("class", "mt-5")

// Append g to wrap up line chart
var stage3Wrapper = stage3Chart.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("transform", "translate(50,100)")

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>Country:</strong> <span style='color:#fef7ea'>" + d.country +
            "</span><br><strong>% difference:</strong> <span style='color:#fef7ea'>" + d.prop + "</span>";
    })
stage3Chart.call(tip);

d3.csv("data/worldGHG_tradeEmission.csv").then(function (data) {
    data.forEach(function (d) {
        d.volumeGT = +d.volumeGT;
        d.prop = +d.prop;
    });

    data.reduce((acc, cur) => {
        cur.start = acc;
        return acc + (cur.volumeGT);
    }, 0);
    console.log(width)
    //Set x-axis scale
    var xScale3 = d3.scaleLinear()
        .domain([0, data[64].start])
        .range([0, 620]);


    // Create x-axis
    var xAxis3 = d3.axisBottom()
        .scale(xScale3);

    // Append x-axis to svg
    stage3Wrapper.append("g")
        .attr("transform", "translate(0,310)")
        .attr("class", "xAxisStage3")
        .call(xAxis3);

    //Set y-axis scale
    var yScale3 = d3.scaleLinear()
        .domain([-30, 100])
        .range([310, 0]);


    // Create y-axis
    var yAxis3 = d3.axisRight()
        .scale(yScale3)
        .ticks(5);

    // Append y-axis to svg
    stage3Wrapper.append("g")
        .attr("transform", "translate(625.6,0)")
        .attr("class", "yAxis")
        .call(yAxis3);


    // Create gridlines
    var gridlineHorizontal = d3.axisRight()
        .tickFormat("")
        .tickSize(width - 185)
        .scale(yScale3)
        .tickValues([-20, 0, 20, 40, 60, 80, 100]);

    stage3Wrapper.append("g")
        .attr("class", "gridStage2")
        .call(gridlineHorizontal);

    var gridlineVertical = d3.axisBottom()
        .tickFormat("")
        .tickSize(height - 330)
        .scale(xScale3)
        .tickValues([0, 5, 10, 15, 20, 25, 30, 35, 40]);

    stage3Wrapper.append("g")
        .attr("class", "gridStage2")
        .call(gridlineVertical);

    // Add interactivity
    function MouseOver(d, i) {
        // Use D3 to select element, change color and size
        d3.select(this).attr("stroke-width", 0.8);
        tip.show(d, i)
    }

    function MouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this).attr("stroke-width", 0.1);
        tip.hide(d, i)
    };
    // add bars
    stage3Wrapper.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", function (d) {
            if (d.region == "non-EU") {
                return "#888";
            } else {
                return "#df9827";
            }
        })
        .style("stroke", "#fef7ea")
        .attr("stroke-width", 0.1)
        .attr("width", function (d) {
            return (xScale3(d.volumeGT))
        })
        .attr("height", function (d) {
            if (d.prop > 0) {
                return yScale3(0) - yScale3(d.prop);
            } else {
                return -(yScale3(0) - yScale3(d.prop));
            }
        })
        .attr("y", function (d) {
            if (d.prop > 0) {
                return (yScale3(d.prop));
            } else {
                return (yScale3(0));
            }
        })
        .attr("x", function (d, i) {
            return xScale3(d.start);
        })
        .on('mouseover', MouseOver)
        .on('mouseout', MouseOut)

    // Add zero line
    stage3Wrapper.append("line")
        .attr("y1", yScale3(0))
        .attr("y2", yScale3(0))
        .attr("x1", 0)
        .attr("x2", xScale3(41.4))
        .style("stroke-width", "2px")
        .style("stroke", "#fef7ea")
        .attr("class", "zero-line");

    // Add annotations
    stage3Wrapper.append("rect")
        .attr("x", xScale3(0.8))
        .attr("y", yScale3(92))
        .attr("width", xScale3(6))
        .attr("height", 50)
        .style("fill", "#14171e");

    stage3Wrapper.append("rect")
        .attr("x", xScale3(1))
        .attr("y", yScale3(90))
        .attr("width", xScale3(2))
        .attr("height", 10)
        .style("fill", "#df9827");

    stage3Wrapper.append("rect")
        .attr("x", xScale3(1))
        .attr("y", yScale3(80))
        .attr("width", xScale3(2))
        .attr("height", 10)
        .style("fill", "#888");

    stage3Wrapper.append("text")
        .attr("x", xScale3(3.5))
        .attr("y", yScale3(86.5))
        .text("EU")
        .attr("class", "ccaLabel")

    stage3Wrapper.append("text")
        .attr("x", xScale3(3.5))
        .attr("y", yScale3(76))
        .text("non-EU")
        .attr("class", "ccaLabel")


    stage3Wrapper.append("text")
        .attr("x", xScale3(27))
        .attr("y", yScale3(22))
        .text("Net consumer")
        .attr("class", "ccaLabel")

    stage3Wrapper.append("text")
        .attr("x", xScale3(27.3))
        .attr("y", yScale3(-12))
        .text("Net producer")
        .attr("class", "ccaLabel")


    var triangleUp = xScale3(29.7) + ' ' + yScale3(28) + ', ' + xScale3(30) + ' ' + yScale3(31) + ', ' + xScale3(30.3) + ' ' + yScale3(28) + ' ' + xScale3(29.7) + ', ' + yScale3(28);
    stage3Wrapper.append('polyline')
        .attr('points', triangleUp)
        .style('fill', '#fef7ea');

    var triangleDown = xScale3(29.7) + ' ' + yScale3(-15) + ', ' + xScale3(30) + ' ' + yScale3(-18) + ', ' + xScale3(30.3) + ' ' + yScale3(-15) + ' ' + xScale3(29.7) + ', ' + yScale3(-15);
    stage3Wrapper.append('polyline')
        .attr('points', triangleDown)
        .style('fill', '#fef7ea');

    stage3Wrapper.append("text")
        .attr("x", xScale3(8.5))
        .attr("y", yScale3(-8))
        .attr("class", "ccaLabel")
        .text("China")

    stage3Wrapper.append("text")
        .attr("x", xScale3(18))
        .attr("y", yScale3(-6))
        .attr("class", "ccaLabel")
        .text("India")

    stage3Wrapper.append("text")
        .attr("x", xScale3(29.2))
        .attr("y", yScale3(2.5))
        .attr("class", "ccaLabel")
        .text("US")

    stage3Wrapper.append("text")
        .attr("x", xScale3(37))
        .attr("y", yScale3(35))
        .attr("class", "ccaLabel")
        .text("UK")

    stage3Wrapper.append("line")
        .attr("x1", xScale3(38))
        .attr("x2", xScale3(40.1))
        .attr("y1", yScale3(37))
        .attr("y2", yScale3(37))
        .style("stroke", "#fef7ea")
});