//forum permissions 

Meteor.publish("posts", function() {
   return Posts.find({});
});

Meteor.publish("singlepost", function(postId) {
    return Posts.find({
        _id: postId
    });
});

Meteor.publish("comments", function(postId) {
    return Comments.find({
        postId: postId
    });
});

//poll permissions

Meteor.publish("polls", function() {
   return Polls.find({});
});


//chat permissions

Meteor.publish("messages", function() {
   return Messages.find({});
});

