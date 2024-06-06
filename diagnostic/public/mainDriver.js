class User {
    constructor(uid, password, username) {
        this.uid = uid;             // Unique identifier for each user
        this.password = password;   // User's password
        this.username = username;   // User's display name
    }
}

class MovieList {
    constructor(list_id, uid, movielist_name, created_at, description) {
        this.list_id = list_id;           // Unique identifier for each movie list
        this.uid = uid;                   // Identifier of the user who created the movie list
        this.movielist_name = movielist_name; // Name of the movielist
        this.created_at = created_at;     // Date and time the movielist was created
        this.description = description;   // Brief description of the movielist
    }
}

class Movie {
    constructor(movie_id, list_id, title, producer, genre, duration, series) {
        this.movie_id = movie_id;       // Unique identifier for each movie
        this.list_id = list_id;         // Identifier of the movielist that the movie is in
        this.title = title;             // Title of the movie
        this.producer = producer;       // Producer of the movie
        this.genre = genre;             // Genre of the movie
        this.duration = duration;       // Duration of the movie
        this.series = series;           // Series the movie belongs to or null if it's not part of a series
    }
}

class Rating {
    constructor(rating_id, uid, list_id, rating, review, rated_at) {
        this.rating_id = rating_id;     // Unique identifier for each rating
        this.uid = uid;                 // Identifier of the user who gave the rating
        this.list_id = list_id;         // Identifier of the movielist being rated
        this.rating = rating;           // Rating given (1 - 5)
        this.review = review;           // Text review of the movielist
        this.rated_at = rated_at;       // Date and time the rating was given
    }
}

var allMovieLists = [];

function fetchUserData() {
    
}

function addRow(name, movies, date) {
    var table = document.querySelector("table tbody");
    var row = table.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${movies}</td>
        <td>${date}</td>
        <td>
            <button>Delete</button>
            <button>Update</button>
        </td>
    `;
}

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

window.onload = function() {
    currentUser = window.currentUserUsername;
    console.log("currentUser is::");
    console.log(currentUser);

    fetchUserData();

    addRow("avengers", ["iron man", "thor"], "2005");
    addRow("Myth", ["black", "green"], "2010");
    addRow("disney", ["Yello", "Green"], "2022");
};
