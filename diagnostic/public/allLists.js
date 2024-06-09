var allMovieLists = [];


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
    fetchAllMovieLists().then(movieLists => {
        const tableBody = document.querySelector('#allMovieListsTable tbody');
        tableBody.innerHTML = '';

        movieLists.forEach(movieList => {
            const row = tableBody.insertRow();

            const nameCell = row.insertCell();
            nameCell.textContent = movieList.movielist_name;

            const moviesCell = row.insertCell();
            moviesCell.textContent = JSON.parse(movieList.movie_names).join(', ');

            const dateCell = row.insertCell();
            dateCell.textContent = new Date(movieList.created_at).toLocaleDateString();

            // const actionsCell = row.insertCell();
            // actionsCell.classList.add('actions');
            // actionsCell.innerHTML = `
            //     <button onclick="viewMovieList('${movieList.movielist_name}')">View</button>
            // `;
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
