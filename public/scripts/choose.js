/* global $ */
/* global shows */

$("button").on("click", function() {
    $.get("/user/:id/choose", function(shows) {
        function chooseMovie() {
            var random = Math.floor(Math.random() * shows.length);
            return shows[random];
        }
        var chosenMovie = chooseMovie();
        $("#movie-title").html("<h1>" + chosenMovie.Title + "</h1>");
        $("#movie-poster").html("<img src=\"" + chosenMovie.Poster + "\">");
    });
});

