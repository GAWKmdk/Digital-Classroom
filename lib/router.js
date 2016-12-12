Router.configure({
    //frame-build
   layoutTemplate: 'layout'
    //,
    //loadingTemplate:'layoutLoading',
    //notFoundTemplate:'notFound'
});



Router.route('/', function () {
    //posting-board
  this.render('landing');
});



Router.route('/userprofile', function () {
    //posting-board
  this.render('user_profile');
});

Router.route('/chat', function () {
    //posting-board
  this.render('direct_chat');
});

Router.route('/quiz', function () {
    //posting-board
  this.render('quiz_poll');
});

Router.route('/quiz_closed', function () {
    //posting-board
  this.render('quiz_yesorno');
});

Router.route('/quiz_open', function () {
    //posting-board
  this.render('quiz_multiplechoice');
});

Router.route('/material', function () {
    //posting-board
  this.render('study_material');
});

Router.route('/penboard', function () {
    //posting-board
  this.render('pen_board');
     
    //CREATES USABLE URL to SHARE
    // {var newPadId = Random.id();        
     //location.href = '/penboard/' + newPadId;},  

    //SETS SESSION VARBS
    
     //'/:padId': {        
    // as: 'pad',        
    // to: function(padId) {
    //Session.set('padId', padId);
    //return 'pad'
    //}
        //} 

});




Router.route("/create-post", {
    name: "createPost",
    layoutTemplate: "layout",
    action: function() {
        this.render("newPost");
    }
});

Router.route("/post/:postId", {
    name: "post",
    layoutTemplate: "layout",
    waitOn: function(){
        return [
            Meteor.subscribe("comments", this.params.postId),
            Meteor.subscribe("singlepost", this.params.postId)
        ];
    },
    action: function() {
        var postId = this.params.postId;
        this.render("post");
    }
});




Router.route("/forum", {
    name: "forum",
    layoutTemplate: "layout",
    waitOn: function(){
      return Meteor.subscribe("posts");
    },
    action: function() {
        this.render("forum");
        
    }
});
