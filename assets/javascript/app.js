
$(document).ready(function(){

	var characters = ["Jon Snow", "Daenerys Targaryen", "Tyrion Lannister", "Cersei Lannister", "Jaime Lannister"];

	// Create the function that generates new buttons
	function createButtons() {

		$("#button_row").empty();

		for( var i = 0; i < characters.length; i++) {

			// Create new button elements
			var button = $("<button>");
			button.addClass("gameCharacter")
			button.data("GoT", characters[i]);
			button.text(characters[i]);
			$("#button_row").append(button);

		}
	};

	createButtons();

	// Listen to submitbtn on click and then put what's typed in input on the buttons
	$(".submitbtn").on("click", function(event) {

		// Cancell whatever default the broswer has set
		event.preventDefault();

		// Store values typed in input in a variable, and trim white spaces
		var newCharacters = $("input").val().trim();

		// Push the new value into the array	
		characters.push(newCharacters);

		// Execute to create new buttons
		createButtons();

		// Empty out the input box
		$("input").val(" ")

	});

	// Create a function to get data from API
	function getData(event) {

		event.preventDefault();

		// Set the URL
		var person = $(this).data("GoT");
		var apiKey = "dc6zaTOxFJmzC";
		var numberOfImages = 10;
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=" + apiKey + "&limit=" + numberOfImages;

		

		// Make ajax call to the API server
		$.ajax({
          	url: queryURL,
          	method: "GET"
        })
        .done(function(response) {

        	console.log(response);
        	console.log(queryURL);


        	for(var i = 0; i < 10; i++) {

        		// Create a new div for each gif
        		var gifDiv = $("<div class='item'>");

        		// Grab still and animated gifs from API
        		var gifStill = response.data[i].images.fixed_height_still.url;
        		var gifAnimated = response.data[i].images.fixed_height.url;

        		// Create new img tags with attributes that include state of the gif (still or animated) and also the actual gifs
        		var displayGif = $("<img class='displayedGif'>")
        			.attr({

        				src: gifStill,
        				dataState: "still",
        				dataAnimated: gifAnimated,
        				dataStill: gifStill,

        			});

        		// Append the gif to $gifDiv	
        		gifDiv.append(displayGif);

        		// Grab rating info from API
        		var rating = response.data[i].rating
        		console.log(rating);

        		// Create new <p> tags that store ratings
        		var displayRating = $("<p>").text("Rating: " + rating);

        		// Append rating to $gifDiv
        		gifDiv.append(displayRating);

        		// Append $gifDiv to its parent
        		$(".gif-display").append(gifDiv);

        	};
        });

        // Clear out what was there before
        $(".gif-display").empty();

	};

	// Listen for clicks on .gameCharacter to execute getData (using $(document) cuz .gameCharacter is being added with new input)
	$(document).on("click", ".gameCharacter", getData);


	// Switch between Still and Animated
	$(document).on("click", ".displayedGif", function(){

		var state = $(this).attr("dataState");

		if (state === "still") {
       				
       			$(this).attr("src", $(this).attr("dataAnimated"));
        		$(this).attr("dataState", "animated");

      	} else {

        		$(this).attr("src", $(this).attr("dataStill"));
        		$(this).attr("dataState", "still");

		}
	});

});
