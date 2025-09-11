// Password strength checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    let strength = 0;
    let strengthLabel = '';
    
    // Check password criteria
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Update strength display
    strengthFill.className = 'strength-fill';
    switch (strength) {
        case 0:
        case 1:
            strengthFill.classList.add('weak');
            strengthLabel = 'Weak';
            break;
        case 2:
            strengthFill.classList.add('fair');
            strengthLabel = 'Fair';
            break;
        case 3:
        case 4:
            strengthFill.classList.add('good');
            strengthLabel = 'Good';
            break;
        case 5:
            strengthFill.classList.add('strong');
            strengthLabel = 'Strong';
            break;
    }
    
    strengthText.textContent = password ? `Password strength: ${strengthLabel}` : 'Password strength';
});

// Form submission
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loading = document.getElementById('loading');
    const submitBtn = document.getElementById('signup-btn');
    const formData = new FormData(this);
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.style.display = 'none';
    });
    
    // Basic validation
    let hasErrors = false;
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'gender', 'password', 'confirmPassword'];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const errorMsg = document.getElementById(field + '-error');
        
        if (!input.value.trim()) {
            errorMsg.textContent = 'This field is required';
            errorMsg.style.display = 'block';
            hasErrors = true;
        }
    });
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email';
        document.getElementById('email-error').style.display = 'block';
        hasErrors = true;
    }
    
    // Password confirmation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
        document.getElementById('confirmPassword-error').style.display = 'block';
        hasErrors = true;
    