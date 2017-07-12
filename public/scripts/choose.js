/* global $ */
/* global user */

$("button").on("click", function() {
    $.get("/user/:id/choose", function(user) {
        function chooseMovie() {
            var random = Math.floor(Math.random() * user.shows.length);
            return user.shows[random];
        }
        var chosenMovie = chooseMovie();
        $("#movie-title").html("<h1>" + chosenMovie.Title + "</h1>");
        $("#movie-poster").html("<img src=\"" + chosenMovie.Poster + "\">");
    });
});

