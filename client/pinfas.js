Meteor.methods({
    clear: function() {
        Points.remove({});
    },

    insertPoint: function(data) {
        return Points.insert({
            x2: data.x2,
            y2: data.y2,
            x1: data.x1,
            y1: data.y1,
            w: data.w,
            opacity: data.opacity,
            c: data.c
        }); // end of points.insert()
    }
});