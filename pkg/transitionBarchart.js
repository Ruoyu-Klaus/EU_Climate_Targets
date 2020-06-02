var transition0 = function () {
    d3.selectAll(".figure2,.figure3")
        .transition()
        .duration(0)
        .style("opacity", 1);
}
var transition1 = function () {
    d3.selectAll(".figure2,.figure3")
        .transition()
        .duration(1000)
        .style("opacity", 0);
    d3.selectAll(".annotations,.annotation-line")
        .transition()
        .duration(1000)
        .style("visibility", "hidden")
        .style("opacity", 0);
}
var transition2 = function () {
    d3.selectAll(".annotations,.annotation-line")
        .transition()
        .duration(1000)
        .style("visibility", "visible")
        .style("opacity", 1);
    d3.select(".figure2")
        .transition()
        .duration(1000)
        .style("opacity", 0);
}
var transition3 = function () {
    d3.selectAll(".annotations,.annotation-line")
        .transition()
        .duration(1000)
        .style("visibility", "visible")
        .style("opacity", 0);
    d3.select(".figure2")
        .transition()
        .duration(1000)
        .style("opacity", 1);
    d3.select(".projection-shape1")
        .transition()
        .duration(1000)
        .style("visibility", "hidden")

}
var transition4 = function () {
    d3.select(".projection-shape1")
        .transition()
        .duration(1000)
        .style("visibility", "visible")
        .style("opacity", 0.5);

    d3.select(".figure2")
        .transition()
        .duration(500)
        .style("opacity", 0);

    d3.select(".projection-shape2")
        .transition()
        .duration(1000)
        .style("visibility", "hidden")
        .style("opacity", 0);
}
var transition5 = function () {
    d3.select(".projection-shape2")
        .transition()
        .duration(1000)
        .style("visibility", "visible")
        .style("opacity", 0.5);
}




d3.graphScroll()
    .graph(d3.selectAll('#graphTargetsGraph'))
    .container(d3.select('#graphScrollContainer'))
    .sections(d3.selectAll('#graphTargetsText > div'))
    .on('active', function (i) {
        // console.log(i + 'th section active');
        if (i < 1) {
            transition0()
        } else if (i == 1) {
            transition1()
        } else if (i == 2) {
            transition2()
        } else if (i == 3) {
            transition3()
        } else if (i == 5) {
            transition4()
        } else if (i == 6) {
            transition5()
        }
    });


// develop ues

// window.onresize = displayWindowSize;
// window.onload = displayWindowSize;

// function displayWindowSize() {
//     let currentWidth = window.innerWidth;
    // console.log(currentWidth)
    // d3.graphScroll()
    //     .graph(d3.selectAll('#graphTargetsGraph'))
    //     .container(d3.select('#graphScrollContainer'))
    //     .sections(d3.selectAll('#graphTargetsText > div'))
    //     .offset(currentWidth > 925 ? 300 : 200)
    //     .on('active', function (i) {
    //         console.log(i + 'th section active');
    //     })

// };