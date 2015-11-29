Movies = new Meteor.Collection('movies');
NewReleases = new Meteor.Collection('newReleases');


Session.setDefault('searching', false);

Tracker.autorun(function(){
	if(Session.get('query')){
		var searchHandle = Meteor.subscribe('movieSearch', Session.get('query'));
		Session.set('searching', !searchHandle.ready());
	}
});

Tracker.autorun(function(){
	var searchNewReleases = Meteor.subscribe('movieReleases');
});


Template.body.events({
	'submit form': function(event, template){
		event.preventDefault();
		var query = template.$('input[type=text]').val();
		console.log('you query for:', query);
		if(query)
			Session.set('query', query);
		$('.movie-search').show();
		$('.new-movies').hide();
	},
	'click #search': function(event){
		event.preventDefault();
		$('input[type=text]').val('');
	}
});



Template.NavBar.events({
	'click .now-showing': function(event){
		event.preventDefault();
		$('.new-movies').show();
		$('.movie-search').hide();
	}
});

Template.NewRelease.helpers({
	newReleases: function(){
		return NewReleases.find();
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



