var allSearchResults = [];

function handleSearch(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchQuery').value;
    
    console.log("Search query:", searchQuery);
}

function initSearchForm() {
    document.getElementById('searchForm').addEventListener('submit', handleSearch);
}

window.onload = function() {
    initSearchForm();
};