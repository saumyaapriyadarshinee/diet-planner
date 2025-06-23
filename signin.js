document.getElementById('signin-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    // Get stored credentials
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedName = localStorage.getItem('Name');

    // Check if entered credentials match the stored ones
    if (email === storedEmail && password === storedPassword) {
        // Store a logged-in state in localStorage
        localStorage.setItem('loggedIn', 'true');
        
        // Redirect to index.html after successful login
        alert(`Welcome back, ${storedName}!`);
        window.location.href = 'index.html'; // Redirect to the index page
    } else {
        alert('Incorrect email or password');
    }
});
