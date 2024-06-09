var allSearchResults = [];

function handleSearch(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchQuery').value.trim();
    
    if (searchQuery === '') {
        alert('Please enter a search query.');
        return;
    }

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: searchQuery })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            allSearchResults = data.movieLists;
            displaySearchResults(data.movieLists);
        } else {
            console.error('Search failed:', data.message);
            alert('Search failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during search:', error);
        alert('An error occurred during the search. Please try again later.');
    });
}

function displaySearchResults(movieLists) {
    const tableBody = document.querySelector('#movieListTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    movieLists.forEach(list => {
        const { list_id, movielist_name, movie_names, created_at } = list;
        const moviesArray = JSON.parse(movie_names);
        const row = tableBody.insertRow();

        const nameCell = row.insertCell();
        nameCell.textContent = movielist_name;

        const moviesCell = row.insertCell();
        moviesCell.textContent = moviesArray.join(', ');

        const dateCell = row.insertCell();
        dateCell.textContent = new Date(created_at).toLocaleDateString();
    });
}

function initSearchForm() {
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
}

document.getElementById('goBackButton').addEventListener('click', function() {
    window.history.back();
});

window.onload = function() {
    initSearchForm();
};
