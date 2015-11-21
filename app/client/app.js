Movies = new Meteor.Collection('movies');


Session.setDefault('searching', false);

Tracker.autorun(function(){
	if(Session.get('query')){
		var searchHandle = Meteor.subscribe('movieSearch', Session.get('query'));
		// var trailer = Meteor.subscribe('trailers', Session.get('id'));
		Session.set('searching', !searchHandle.ready());
	}
});

Template.body.events({
	'submit form': function(event, template){
		event.preventDefault();
		var query = template.$('input[type=text]').val();
		console.log('you query for:', query);
		if(query)
			Session.set('query', query);
	},
	'click #search': function(event){
		event.preventDefault();
		$('input[type=text]').val('');
	},
	'click .now-showing': function(event){
		event.preventDefault();
		alert('works');
	}
});


Template.MovieLayout.helpers({
	movies: function(){
		return Movies.find();
	},
	searching: function(){
		return Session.get('searching');
	}
});

Template.footer.helpers({
	year: function(){
		var year = moment().format("YYYY");
		return year;
	}
});




