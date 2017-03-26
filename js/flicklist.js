

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "" // TODO (REMOVED ON PURPOSE) 0 put your api key here
}

/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
      model.browseItems = response.results;

			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7 (DONE)
  // clear everything from both lists
      $("#section-watchlist ul").empty();
      $("#section-browse ul").empty();

  // TODO 6 (DONE)
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
    model.watchlistItems.forEach(function(movie) {

    //  $('#section-watchlist').append('<li>'+ movie +'</li>');
      var title = $("<p></p>").text(movie.original_title);
      var watchItem = $("<li></li>").append(title);
      $('#section-watchlist ul').append(watchItem);

      });


  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3 (DONE)
		// insert a list item into the <ul> in the browse section
      var title = $("<p></p>").text(movie.title);
      var listItem = $("<li></li>").append(title); //title is an attribute, and movie is the object
      $('#section-browsing').append(listItem);

      // TODO 4 (DONE)
		// the list item should include a button that says "Add to Watchlist"
       var button = $('<input/>').attr({
                              type: "submit",
                             value: "Add To Watchlist"
                           });
       $(listItem).append(button);

		// TODO 5 (DONE)
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again

      button.click(function() {
      // console.log("You clicked my button!");
      model.watchlistItems.push(movie);
      render();
      //console.log(model.watchlistItems);  //to see if movies are being added

      console.log("I love you!");
      });

  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
