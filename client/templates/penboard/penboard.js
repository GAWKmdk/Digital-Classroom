

var canvas, canvasWidth;

// we use these for drawing more interesting shapes
var lastX = 0;
var lastY = 0;
var thickness = 1;
var opacity = 1.0;
var strokeColor = 'black';


Template.drawingApp.onRendered(function() {
    // find the available width of the canvas area
    canvasWidth = $('#canvas').width();

    // initialize the Canvas object
    canvas = new Canvas(canvasWidth);

    Tracker.autorun( function() {
        var data = Points.find({}).fetch();

        if (canvas) {
            canvas.draw(data);
        }
    });

    // initialize Confirmation popup for "clear" button
    $('#clear').confirmation({
        onConfirm: function() {

            // clear the drawing
            Meteor.call('clear', function() {
                canvas.clear();
            });
        }
    });

    // initialize Mini Colors plugin
    $('#color-input').minicolors({
        theme: 'bootstrap',
        position: 'bottom right',
        changeDelay: 250,
        change: function(value, opacity) {
            strokeColor = value;
        }
    });

    // initialize slider for stroke thickness
    $('#thickness-slider').slider({
        orientation: 'horizontal',
        min: 1,
        max: 100,
        step: 1,
        value: 2,
        slide: function(event, ui) {
            $('#thickness-input').val(ui.value);
        },
        stop: function(event, ui) {
            thickness = ui.value;
        }
    });

    // initialize slider for stroke opacity
    $('#opacity-slider').slider({
        orientation: 'horizontal',
        min: 0.0,
        max: 1.0,
        step: 0.01,
        value: 1.0,
        slide: function(event, ui) {
            $('#opacity-input').val(ui.value);
        },
        stop: function(event, ui) {
            opacity = ui.value;
        }
    });
});



Template.drawingApp.events({

    'change #thickness-input': function(event) {
        thickness = parseInt(event.target.value, 10);
        $('#thickness-slider').slider('value', thickness);
    },

    'change #opacity-input': function(event) {
        opacity = parseFloat(event.target.value, 10);
        $('#opacity-slider').slider('value', opacity);
    },

    'click #save': function(){
        var svg = $('#canvas').children('svg')[0],
            data = (new XMLSerializer()).serializeToString(svg),
            blob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});

        // trigger the download with Filesaver.js
        saveAs(blob, 'drawing.svg');
    }
});



var markPoint = function(event) {

    var offset = $('#canvas').offset();

    // In the first frame, lastX and lastY are 0.
    // This means the line gets drawn to the top left of the screen
    // Which is annoying, so we test for this and stop it happening.

    if (lastX == 0) { // check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
    }

    var pointData = {
        // this draws a point exactly where you click the mouse
        // x: (event.pageX - offset.left),
        // y: (event.pageY - offset.top)});


        // We can do more interesting stuff
        // We need to input data in the right format
        // Then we can send this to d3 for drawing


        // 1) Algorithmic mouse follower
        // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
        // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        // 2) draw a line - requires you to change the code in drawing.js
        x2: (event.pageX - offset.left),
        y2: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,

        // We could calculate the line thickness from the distance
        // between current position and last position
        // w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,

        // stroke opacity
        opacity: opacity,

        // We can also use strokeColor, defined by a selection
        c: strokeColor
    };

    Meteor.call('insertPoint', pointData, function(error, result) {
        if (error) {
            console.log(error.reason);
        }
    });

    // update last coordinates
    lastX = (event.pageX - offset.left);
    lastY = (event.pageY - offset.top);
}



Template.canvas.events({
    'click': function(event) {
        markPoint(event);
    },

    'mousedown': function(event) {
        Session.set('draw', true);
    },

    'mouseup': function(event) {
        Session.set('draw', false);
        lastX = 0;
        lasyY = 0;
    },

    'mousemove': function(event) {
        if (Session.get('draw')) {
            markPoint(event);
        }
    }
});