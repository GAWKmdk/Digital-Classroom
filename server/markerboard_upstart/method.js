Meteor.methods({
    clear: function() {
        Points.remove({});
    },

    insertPoint: function(data) {
        check(data, {
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number,
            w: Number,
            opacity: Number,
            c: String
        });

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