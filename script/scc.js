document.getElementById('payload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    
    // Send data to server
    fetch('/submit-payload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Handle response from server
        // Display success message or redirect user
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Display error message to user
    });
});