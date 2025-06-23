document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const Name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    const age = document.getElementById('signup-age').value;
    const gender = document.getElementById('signup-gender').value;
    const height = document.getElementById('signup-height').value;
    const weight = document.getElementById('signup-weight').value;
    const goal = document.getElementById('signup-goal').value;
    const diet = document.getElementById('signup-diet').value;
  
    // Store all user info in localStorage
    localStorage.setItem('Name', Name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);
    localStorage.setItem('goal', goal);
    localStorage.setItem('diet', diet);
  
    alert('Account created successfully!');
    window.location.href = 'signin.html'; // Redirect to the sign-in page
  });
  