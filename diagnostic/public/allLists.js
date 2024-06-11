var allMovieLists = [];

function fetchRatings() {
    return fetch('/get-ratings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.ratings;
        } else {
            console.error('Failed to fetch ratings:', data.message);
            return [];
        }
    })
    .catch(error => {
        console.error('Error fetching ratings:', error);
        return [];
    });
}


function submitRating(listId, rating) {
    return fetch('/rate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ listId: listId, rating: rating })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Rating submitted successfully');
            populateMovieListTable(); // Refresh the table
        } else {
            console.error('Failed to submit rating:', data.message);
        }
    })
    .catch(error => {
        console.error('Error submitting rating:', error);
    });
}


function fetchAllMovieLists() {
    return fetch('/get-all-lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return data.movieLists;
        } else {
            console.error('Failed to fetch movie lists:', data.message);
            return [];
        }
    })
    .catch(error => {
        console.error('Error fetching movie lists:', error);
        return [];
    });
}

function populateMovieListTable() {
    Promise.all([fetchAllMovieLists(), fetchRatings()]).then(values => {
        const [movieLists, ratings] = values;
        const tableBody = document.querySelector('#allMovieListsTable tbody');
        tableBody.innerHTML = '';

        const ratingMap = ratings.reduce((map, rating) => {
            map[rating.list_id] = rating.average_rating;
            return map;
        }, {});

        movieLists.forEach(movieList => {
            const row = tableBody.insertRow();

            const nameCell = row.insertCell();
            nameCell.textContent = movieList.movielist_name;

            const moviesCell = row.insertCell();
            moviesCell.textContent = JSON.parse(movieList.movie_names).join(', ');

            const dateCell = row.insertCell();
            dateCell.textContent = new Date(movieList.created_at).toLocaleDateString();

            // Rate input cell
            const rateCell = row.insertCell();
            const rateInput = document.createElement('input');
            rateInput.type = 'number';
            rateInput.min = '1';
            rateInput.max = '5';
            rateInput.addEventListener('change', function() {
                submitRating(movieList.list_id, rateInput.value);
            });
            rateCell.appendChild(rateInput);

            // Average rating cell
            const avgRatingCell = row.insertCell();
            avgRatingCell.textContent = ratingMap[movieList.list_id] || 'N/A';
        });
    });
}

// function viewMovieList(name) {
//     console.log('Viewing movie list:', name);
// }

// // function editMovieList(name) {
// //     console.log('Editing movie list:', name);
// // }

// // function deleteMovieList(name) {
// //     console.log('Deleting movie list:', name);
// // }

document.getElementById('goBackButton').addEventListener('click', function() {
    window.history.back();
});

window.onload = function() {
    populateMovieListTable();
};
