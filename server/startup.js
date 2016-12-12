import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
   // if there are no polls available create sample data
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        question: 'What Poll form do you prefer ?',
        choices: [
          { text: 'Text Summaries', imageurl:'http://static.planetminecraft.com/files/resource_media/screenshot/1236/mario_3501733.jpg', votes: 67 },
          { text: 'Video clips', imageurl:'http://static.planetminecraft.com/files/resource_media/screenshot/1236/mario_3501733.jpg', votes: 22 },
          { text: 'Audio/Podcasts', imageurl:'http://static.planetminecraft.com/files/resource_media/screenshot/1236/mario_3501733.jpg', votes: 11 },
          { text: 'Coupons', imageurl:'http://static.planetminecraft.com/files/resource_media/screenshot/1236/mario_3501733.jpg',votes: 9 }
        ]
      },
      {
        question: 'Most Requested Featured ?',
        choices: [
          { text: 'Picture Select Survey', imageurl:'http://piq.codeus.net/static/media/userpics/piq_125406_400x400.png', votes: 14 },
          { text: 'Closed Question Survey', imageurl:'http://piq.codeus.net/static/media/userpics/piq_125406_400x400.png', votes: 12 },
          { text: 'Text-input Survey', imageurl:'http://piq.codeus.net/static/media/userpics/piq_125406_400x400.png', votes: 13 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });

  }
    
<<<<<<< HEAD
 
=======
  
  /**
 * Hypergrowth
 * Create Meteor Accounts/Users using api.randomuser.me/
 */

Hypergrowth = {
	options: {
		defaultUsers: 100,
		// add more customizing options
	},
	config: function(opts) {
		this.options = _.extend({}, this.options, opts);
	}
};

Hypergrowth.start = function(numberOfUsers) {
	if (typeof numberOfUsers === 'number' || typeof numberOfUsers === 'undefined') {
		numberOfUsers = (typeof numberOfUsers === 'undefined') ? Hypergrowth.options.defaultUsers : numberOfUsers;
		var url = 'http://api.randomuser.me/?results=';
		Meteor.http.post(url + numberOfUsers, {
			dataType: JSON
		},
		function(error, data) {
			if (error) {
				console.log(error);
			}
			if (data) {
				if (data.statusCode == 200) {
					var randomUserData = JSON.parse(data.content).results;
					try {
						randomUserData.forEach(function (newUser) {
							Accounts.createUser({
								'username': newUser.user.name.first + newUser.user.name.last,
								'email': newUser.user.email,
								'password': '',
								'profile': newUser.user
							});
						});
						var message = "Thanks to the advances of Socialist Russia and Media Hypoderums, Hypergrowth can now be your own artifical feeling engineered to populate and protection your popular statism. You've got " + randomUserData.length + " new user(s)."
						console.log(message);
					} catch (dataError) {
						console.log(dataError);
					}
				} else {
					console.log("Oops, something went wrong. Server code: "+data.statusCode+" Message: " + data.content);
				}
			}
		});
	} else {
		console.log("Have you called your Hypergrowth with a number?")
	}
};
    
// uses Hypergrowth to add 100 new users
 Hypergrowth.start();   
    
    
>>>>>>> 491f4a6e80431a3fbd20783af6b74c6bc28f661f
});
