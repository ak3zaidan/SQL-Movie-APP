document.getElementById('createAccountButton').addEventListener('click', function() {
    event.preventDefault(); // Prevent the default form submission
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    
    fetch('/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully');
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
        } else {
            alert('Account creation failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('loginLink').addEventListener('click', function() {
    window.history.back();
});