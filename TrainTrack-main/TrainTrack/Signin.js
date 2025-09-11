document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loading = document.getElementById('loading');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Clear previous error messages
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    
    // Show loading state
    loading.classList.add('active');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Basic validation
        if (!email || !password) {
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
            }
            if (!password) {
                document.getElementById('password-error').textContent = 'Password is required';
                document.getElementById('password-error').style.display = 'block';
            }
            loading.classList.remove('active');
            submitBtn.disabled = false;
            return;
        }
        
        // Mock successful login
        alert('Sign in successful! Redirecting to dashboard...');
        window.location.href = 'index.html';
        
        loading.classList.remove('active');
        submitBtn.disabled = false;
    }, 2000);
});

function signInWithGoogle() {
    alert('Google Sign In would be implemented here');
}

// Add some interactive effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentNode.classList.remove('focused');
    });
});

