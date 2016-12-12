Canvas = function (canvasWidth) {
    var self = this,
        svg;

    self.createSvg = function() {
        svg = d3.select('#canvas')
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', 500);
    };

    self.createSvg();

    self.clear = function() {
        d3.select('svg').remove();
        self.createSvg();
    };

    self.draw = function(data) {
        if (data.length < 1) {
            self.clear();
            return;
        }

        if (svg) {

            // Remember to format the data properly in markPoints

            // to draw a circle -
            // svg.selectAll('circle').data(data, function(d) { return d._id; })
            // .enter().append('circle')
            // .attr('r', 10)
            // .attr('cx', function (d) { return d.x; })
            // .attr('cy', function (d) { return d.y; });

            //to draw a line
            svg.selectAll('line').data(data, function(d) { return d._id; })
            .enter().append('line')
            .attr('x1', function (d) { return d.x1; })
            .attr('y1', function (d) { return d.y1; })
            .attr('x2', function (d) { return d.x2; })
            .attr('y2', function (d) { return d.y2; })
            .attr('stroke-width', function (d) { return d.w; })
            .attr('stroke-opacity', function (d) { return d.opacity; })
            .attr('stroke', function (d) { return d.c; })
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round');


        } // end of the if(svg) statement
    }; // end of the canvas.draw function
} //end of the canvas function