// creates a new database with a table (collection) called players. Place the collection inside 
// a variable for easy reference - notice this is a global variable
PlayersList = new Mongo.Collection('players');



//++++++ this code runs on the browser only +++++++++++++
if(Meteor.isClient){
 
  // /////////////// HELPERS TEMPLATE (methods that return data to be displayed) //////////////////////////////

   // this helper is referencing the leaderboard template
  Template.leaderboard.helpers({
    // here we're using this to loop for each player in PlayersList collection
    player: function () {
            // let's sort the players (PASSING -1 SORTS IN DESCENDING ORDER!! )
            // using the {} indicates that you want to retrieve all data and allows you to add the 
            // second argument: sort - you can also sort the name alphabetically by passing name: 1
            // because we're passing score first that how they would be sort first then their name
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
    },
    playerCount: function(){
      return PlayersList.find().count(); // show the number of players in our PlayersList collection
    },
    // I'm playing with the moment library to add a date
    whatDayisToday: function(){
      var day = moment().format('MMM Do');
        return day;
    },
    // change the background color of the selected player
    selectedClass: function(){
      var playerId = this._id; //using the unique ID  and selected Player we can make sure the selection is the right player...I think
      // selectedPlayer gets the unique ID of each player
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId === selectedPlayer){
        return "selected"; //we need to return text equal to the name of the CSS class. We named the class selected so that's what we are returning
      }
    },
    // showing the selected player
    showSelectedPlayer: function(){
      // getting the ID
      var selectedPlayer = Session.get('selectedPlayer');
      // using findOne is the preferred way to return data from a single document inside the PlayersList collection
      return PlayersList.findOne(selectedPlayer);
    },
    // show yellow background (css high-score) for score if it is equal or higher than 30
    highScorePlayer: function(){
      var highScore = this.score;
      if(highScore >= 30){
        return "high-score";
      }
    }
  });
  // ------------- END HELPERS TEMPLATE -------------------------




  // //////////////// EVENTS TEMPLATE /////////////////////////////

  Template.leaderboard.events({
    // using a css class (.player) targets the event more precisely to the html element
    'click .player': function(){
      var playerId = this._id;  // create variable to store unique ID
      Session.set('selectedPlayer', playerId); // using Session to store data you pass name 
                                              // and value as arguments (key, value) syntax 
                                              //used - it won't be saved to the database

      // testing Session to make sure I can get its value ('session value test')when you click in a row
      // we don't really need to see the id on the console everytime so I'll comment this out
        // var selectedPlayer = Session.get('selectedPlayer');
        // console.log(selectedPlayer);
    },
    'mouseenter .player': function(e){
      var addClass = $(e.target).addClass('player-hover');
      if(!$(e.target).hasClass('player-hover')){
        return addClass;
        }
    },
      'mouseleave .player': function(e) {
        var removeClass = $(e.target).removeClass('player-hover');
        if($(e.target).hasClass('player-hover')){
          return removeClass;
      }
    },
    'click .increment': function(){
      // get the unique ID of each player
      var selectedPlayer = Session.get('selectedPlayer');
      // update the PlayersList $inc (increments https://docs.mongodb.org/manual/reference/operator/update/inc/)
      PlayersList.update(selectedPlayer, {$inc:{score: 5} });
    },
    // decrement selected player score by 5 points
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc:{score: -5} });
    }
  });
  // ------------- END EVENTS TEMPLATE ----------------------


}
// ------------------ end isClient block -------------------------







//++++++  this code runs on the server only +++++++++++++++
if(Meteor.isServer){
  
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++







