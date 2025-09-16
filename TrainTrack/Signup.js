// Form elements
        const signupForm = document.getElementById('signupForm');
        const signupBtn = document.getElementById('signupBtn');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const btnText = document.getElementById('btnText');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        const errorText = document.getElementById('errorText');

        // Input elements
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const agreeTerms = document.getElementById('agreeTerms');

        // Password toggle functionality
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const passwordField = this.previousElementSibling.previousElementSibling;
                const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordField.setAttribute('type', type);
                
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        });

        // Password strength checker
        const passwordStrength = document.getElementById('passwordStrength');
        
        password.addEventListener('input', function() {
            const value = this.value;
            if (value.length > 0) {
                passwordStrength.style.display = 'block';
                checkPasswordStrength(value);
            } else {
                passwordStrength.style.display = 'none';
            }
        });

        function checkPasswordStrength(password) {
            const strengthElement = passwordStrength;
            const strengthText = strengthElement.querySelector('.strength-text');
            
            let strength = 0;
            let feedback = '';

            // Length check
            if (password.length >= 8) strength++;
            
            // Uppercase check
            if (/[A-Z]/.test(password)) strength++;
            
            // Lowercase check
            if (/[a-z]/.test(password)) strength++;
            
            // Number check
            if (/\d/.test(password)) strength++;
            
            // Special character check
            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

            // Remove all strength classes
            strengthElement.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');

            if (strength <= 2) {
                strengthElement.classList.add('strength-weak');
                feedback = 'Weak';
            } else if (strength === 3) {
                strengthElement.classList.add('strength-fair');
                feedback = 'Fair';
            } else if (strength === 4) {
                strengthElement.classList.add('strength-good');
                feedback = 'Good';
            } else {
                strengthElement.classList.add('strength-strong');
                feedback = 'Strong';
            }

            strengthText.textContent = `Password strength: ${feedback}`;
        }

        // Real-time validation
        const inputs = [firstName, lastName, email, username, password, confirmPassword];
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateField(input);
                }
            });
        });

        // Confirm password validation
        confirmPassword.addEventListener('input', function() {
            if (this.value && password.value && this.value !== password.value) {
                showFieldError('confirmPassword', 'Passwords do not match');
            } else {
                hideFieldError('confirmPassword');
            }
        });

        function validateField(field) {
            const value = field.value.trim();
            const fieldId = field.id;
            
            switch (fieldId) {
                case 'firstName':
                case 'lastName':
                    if (!value) {
                        showFieldError(fieldId, `${fieldId === 'firstName' ? 'First' : 'Last'} name is required`);
                        return false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value) {
                        showFieldError(fieldId, 'Email is required');
                        return false;
                    } else if (!emailRegex.test(value)) {
                        showFieldError(fieldId, 'Please enter a valid email address');
                        return false;
                    }
                    break;
                    
                case 'username':
                    if (!value) {
                        showFieldError(fieldId, 'Username is required');
                        return false;
                    } else if (value.length < 3) {
                        showFieldError(fieldId, 'Username must be at least 3 characters');
                        return false;
                    }
                    break;
                    
                case 'password':
                    if (!value) {
                        showFieldError(fieldId, 'Password is required');
                        return false;
                    } else if (value.length < 8) {
                        showFieldError(fieldId, 'Password must be at least 8 characters');
                        return false;
                    }
                    break;
                    
                case 'confirmPassword':
                    if (!value) {
                        showFieldError(fieldId, 'Please confirm your password');
                        return false;
                    } else if (value !== password.value) {
                        showFieldError(fieldId, 'Passwords do not match');
                        return false;
                    }
                    break;
            }
            
            hideFieldError(fieldId);
            return true;
        }

        function showFieldError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.add('invalid');
            field.classList.remove('valid');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        function hideFieldError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('invalid');
            field.classList.add('valid');
            errorElement.style.display = 'none';
        }

        // Form submission
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous messages
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            // Check terms agreement
            if (!agreeTerms.checked) {
                document.getElementById('termsError').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('termsError').style.display = 'none';
            }

            if (!isValid) {
                errorMessage.style.display = 'block';
                errorText.textContent = 'Please fix the errors below.';
                signupBtn.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    signupBtn.style.animation = '';
                }, 500);
                return;
            }

            // Show loading state
            signupBtn.classList.add('loading');
            loadingSpinner.style.display = 'inline-block';
            btnText.textContent = 'Creating Account...';