class User {
    constructor(uid, password, username) {
        this.uid = uid;             // Unique identifier for each user
        this.password = password;   // User's password
        this.username = username;   // User's display name
    }
}

class MovieList {
    constructor(list_id, uid, movielist_name, created_at, movieNames = []) {
        this.list_id = list_id;
        this.uid = uid;       
        this.movielist_name = movielist_name; 
        this.created_at = created_at;    
        this.movieNames = movieNames;  
    }

    addMovie(movieName) {
        this.movieNames.push(movieName);
    }
    removeMovie(movieName) {
        this.movieNames = this.movieNames.filter(name => name !== movieName);
    }
    getMovies() {
        return this.movieNames;
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
let currentUserId = null;
let currentEditID = null;

function fetchUserData() {
    if (!currentUserId) {
        console.error('no user is currently logged in.');
        return;
    }

    fetch('/get-user-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: currentUserId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Movie Lists:', data.movieLists);
            allMovieLists = data.movieLists
            displayMovieLists(data.movieLists);
        } else {
            console.error('Failed to fetch movie lists:', data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

function displayMovieLists(movieLists) {
    var tableBody = document.querySelector("table tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    movieLists.forEach(list => {
        const { list_id, movielist_name, movie_names, created_at } = list;
        const moviesArray = JSON.parse(movie_names);
        addRow(list_id, movielist_name, moviesArray, created_at);
    });
}

function addRow(listID, name, movies, date) {
    var table = document.querySelector("table tbody");
    var row = table.insertRow();
    var moviesString = Array.isArray(movies) ? movies.join(', ') : movies;
    var formattedDate = new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString();

    row.innerHTML = `
        <td>${name}</td>
        <td>${moviesString}</td>
        <td>${formattedDate}</td>
        <td>
            <button class="delete-btn">Delete</button>
            <button class="update-btn">Update</button>
        </td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', function() {
        if (confirm(`Are you sure you want to delete the movie list "${name}"?`)) {
            fetch('/delete-movie-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movielist_name: name,
                    uid: currentUserId
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    row.remove();
                    alert('Movie list deleted successfully.');
                } else {
                    alert('Failed to delete movie list: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while deleting the movie list.');
            });
        }
    });

    row.querySelector('.update-btn').addEventListener('click', function() {
        const editMovieListForm = document.getElementById('editMovieListForm');
        const movieListForm = document.getElementById('editListForm');
    
        if (editMovieListForm.style.display === 'none') {
            editMovieListForm.style.display = 'block';
            currentEditID = listID
            document.getElementById('editListName').value = name;
            document.getElementById('editMovies').value = movies;
        } else {
            editMovieListForm.style.display = 'none';
            movieListForm.reset();
        }
    });
}

document.getElementById('logoutButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('newList').addEventListener('click', function() {
    const newMovieListForm = document.getElementById('newMovieListForm');
    const movieListForm = document.getElementById('movieListForm');

    if (newMovieListForm.style.display === 'none') {
        newMovieListForm.style.display = 'block';
    } else {
        newMovieListForm.style.display = 'none';
        movieListForm.reset();
    }
});

document.getElementById('movieListForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const listName = document.getElementById('listName').value;
    const movies = document.getElementById('movies').value.split(',').map(movie => movie.trim());
    event.target.reset();
    document.getElementById('newMovieListForm').style.display = 'none';
    createMovieList(listName, movies);
});

document.getElementById('editListForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const listName = document.getElementById('editListName').value;
    const movies = document.getElementById('editMovies').value.split(',').map(movie => movie.trim());
    event.target.reset();
    document.getElementById('editMovieListForm').style.display = 'none';
    updateMovieList(listName, movies);
});

function updateMovieList(listName, movies) {
    const requestBody = {
        listId: currentEditID,
        listName: listName,
        movies: movies,
        uid: currentUserId
    };

    fetch('/update-movie-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            fetchUserData();
        } else {
            alert('Failed to update movie list: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the movie list. Please try again later.');
    });
}

function createMovieList(listName, movies) {
    fetch('/create-movie-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listName: listName,
            movies: movies,
            uid: currentUserId
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('movielist creatd successfully');
            fetchUserData();
        } else {
            console.error('failed to create movie list', data.message);
        }
    })
    .catch(error => {
        console.error('Err creating movie list', error);
    });
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    if (userId) {
        console.log(userId);
        currentUserId = userId
        fetchUserData();
    } else {
        console.error('User ID not found in the URL.');
    }
};
