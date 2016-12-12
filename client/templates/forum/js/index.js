Template.forum.helpers({
    posts: function() {
        return Posts.find({}, {
            sort: {
                numDifference: -1
            }
        });
    }
})
