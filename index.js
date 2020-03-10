    // -----------STAGE ONE----------- //
    //Set SVG size for Stage 1 and 3 charts
    var margin = {
            top: 20,
            right: 20,
            left: 30,
            bottom: 20
        },
        width = 810,
        height = 640;

    var stage1Chart = d3.select(".timeline")
        .attr("viewBox", "0 0 " + width + " " + height) //making responsive? - resizes svg within window
        .attr("class", "mt-5")
    // .attr("width", width)
    // .attr("height", height)

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
            .attr("stroke-width", 1.5)
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
        .style("opacity", 0.5)
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
    projectionShape2 =
        stage1Wrapper.append("path")
        .datum(projectionTwo)
        .attr("class", "projection-shape2")
        .attr("fill", "#df9827")
        .attr("stroke", "#df9827")
        .style("opacity", 0.5)
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

    var chart = am4core.create("country-bar", am4charts.XYChart);
    chart.dataSource.url = "data/draggablebar_data.json";

    chart.padding(40, 40, 0, 0);
    chart.maskBullets = false; // allow bullets to go out of plot area


    // category axis
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    // categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 0;
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
    valueAxis.renderer.labels.template.fill = am4core.color("#fef7ea");
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 1.5;
    valueAxis.renderer.line.stroke = am4core.color("#fef7ea");
    valueAxis.title.text = "% change in emissions from 1990 levels"
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
    labelBullet.dx = -20;
    labelBullet.label.truncate = false;

    // series bullet
    var bullet = series.bullets.create();
    bullet.stroke = am4core.color("#ffffff");
    bullet.strokeWidth = 3;
    bullet.opacity = 1; // initially invisible
    bullet.defaultState.properties.opacity = 1;
    // resize cursor when over
    bullet.cursorOverStyle = am4core.MouseCursorStyle.horizontalResize;
    bullet.draggable = true;
    // create hover state
    var hoverState = bullet.states.create("hover");
    hoverState.properties.opacity = 1; // visible when hovered


    // add circle sprite to bullet
    var circle = bullet.createChild(am4core.Circle);
    circle.fill = am4core.color("#ffffff")
    circle.radius = 2;
    circle.dy = -8;


    // while dragging
    bullet.events.on("drag", event => {
        handleDrag(event);
    });

    bullet.events.on("dragstop", event => {
        var dataItem = event.target.dataItem;
        handleDrag(event);
        dataItem.column.isHover = false;
        event.target.isHover = false;
        // console.log(valueAxis.xToValue(event.target.pixelX))
        var currentData = []
        series.dataItems.values.forEach(i => currentData.push(i.valueX))
        d3.json("/data/draggablebar_data.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].newChange = currentData[i];
                data[i].reducedEmissions = (1 + data[i].newChange / 100) * data[i][1990];
            }
            euTotal = data.reduce((acc, cur, id) => {
                return acc + (cur.reducedEmissions);
            }, 0)
            var eu1990 = 5649529.342;
            var absoluteDifference = euTotal - eu1990
            var euReduction = absoluteDifference / eu1990 * 100
            createCircle(euReduction);
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
        // itemBullet.minX = column.pixelX + column.pixelWidth / 2;
        // itemBullet.maxX = itemBullet.minX;
        // itemBullet.minY = 0;
        // itemBullet.maxY = chart.seriesContainer.pixelHeight;
        itemBullet.minX = 0;
        itemBullet.maxX = chart.seriesContainer.pixelWidth;
        itemBullet.minY = column.pixelY + column.pixelHeight;
        itemBullet.maxY = itemBullet.minY;
    });

    // Eu chart 
    var euChart = {
        width: 400,
        height: 400,
        margin: {
            left: 25,
            right: 10,
            top: 20,
            bottom: 40
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

    function createCircle(y = -30) {
        var dots = overallEu.selectAll(".dot")
            .data([{
                x: 0.75,
                y: y,
            }])
        dots.exit()
            .remove()
        var new_dots = dots.enter()
            .append("circle")
            .attr("class", "dot")
            .attr("r", 20)
            .attr("fill", "#df9827")

        dots.merge(new_dots)
            .attr("cx", function (d) {
                return euXscale(d.x);
            })
            .attr("cy", function (d) {
                return euYscale(d.y);
            })
    }
    createCircle()

    overallEu.select(".x.axis")
        .attr("opacity", 0)
        .call(euXaxis);
    overallEu.select(".y.axis")
        .call(euYaxis);



    //----------STAGE THREE---------//
    var stage3Chart = d3.select(".cca-chart")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("class", "mt-5")

    // Append g to wrap up line chart
    var stage3Wrapper = stage3Chart.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("transform", "translate(50,100)")

    d3.csv("data/worldGHG_tradeEmission2.csv").then(function (data) {
        data.forEach(function (d) {
            d.volumeGT = +d.volumeGT;
            d.prop = +d.prop;
        });

        data.reduce((acc, cur, idx) => {
            cur.start = acc;
            return acc + (cur.volumeGT);
        }, 0);



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
            });


    });