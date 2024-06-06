var allMovieLists = [];


function fetchAllMovieLists() {
    // fake data
    const mockMovieLists = [
        { name: 'Movie List 1', movies: ['Movie 1', 'Movie 2'], date: '2022-01-01' },
        { name: 'Movie List 2', movies: ['Movie 3', 'Movie 4'], date: '2022-01-02' },
        { name: 'Movie List 3', movies: ['Movie 5', 'Movie 6'], date: '2022-01-03' }
    ];

    return mockMovieLists;
}

function populateMovieListTable() {
    const movieLists = fetchAllMovieLists();
    const tableBody = document.querySelector('#allMovieListsTable tbody');
    tableBody.innerHTML = '';

    movieLists.forEach(movieList => {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell();
        nameCell.textContent = movieList.name;

        const moviesCell = row.insertCell();
        moviesCell.textContent = movieList.movies.join(', ');

        const dateCell = row.insertCell();
        dateCell.textContent = movieList.date;

        const actionsCell = row.insertCell();
        actionsCell.classList.add('actions');
        actionsCell.innerHTML = `
            <button onclick="viewMovieList('${movieList.name}')">View</button>
            <button onclick="editMovieList('${movieList.name}')">Edit</button>
            <button onclick="deleteMovieList('${movieList.name}')">Delete</button>
        `;
    });
}

function viewMovieList(name) {
    console.log('Viewing movie list:', name);
}

function editMovieList(name) {
    console.log('Editing movie list:', name);
}

function deleteMovieList(name) {
    console.log('Deleting movie list:', name);
}

window.onload = function() {
    populateMovieListTable();
};
