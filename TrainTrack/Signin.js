
        // Password toggle functionality
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');

        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        // Form submission handling
        const loginForm = document.getElementById('loginForm');
        const loginBtn = document.getElementById('loginBtn');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const btnText = document.getElementById('btnText');
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Hide previous messages
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';

            // Show loading state
            loginBtn.classList.add('loading');
            loadingSpinner.style.display = 'inline-block';
            btnText.textContent = 'Logging in...';

            // Simulate API call
            setTimeout(() => {
                // Simple validation (replace with actual authentication logic)
                if (username === 'admin' && password === 'password') {
                    // Success
                    successMessage.style.display = 'block';
                    btnText.textContent = 'Success!';
                    
                    // Redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'dashboard.html'; // Replace with your redirect URL
                    }, 2000);
                } else {
                    // Error
                    errorMessage.style.display = 'block';
                    loginBtn.classList.remove('loading');
                    loadingSpinner.style.display = 'none';
                    btnText.textContent = 'Log In';
                    
                    // Shake animation for error
                    loginBtn.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        loginBtn.style.animation = '';
                    }, 500);
                }
            }, 1500);
        });

        // Shake animation for errors
        const shakeKeyframes = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        
        // Add shake animation to stylesheet
        const style = document.createElement('style');
        style.textContent = shakeKeyframes;
        document.head.appendChild(style);

        // Input focus effects
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        });

        // Remember me functionality
        const rememberMeCheckbox = document.getElementById('rememberMe');
        const usernameInput = document.getElementById('username');

        // Load saved username if remember me was checked
        window.addEventListener('load', function() {
            const savedUsername = localStorage.getItem('rememberedUsername');
            if (savedUsername) {
                usernameInput.value = savedUsername;
                rememberMeCheckbox.checked = true;
            }
        });

        // Save username when form is submitted and remember me is checked
        loginForm.addEventListener('submit', function() {
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedUsername', usernameInput.value);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        });

        // Add ripple effect to login button
        loginBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add ripple effect styles
        const rippleStyles = `
            .login-btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: rippleEffect 0.6s linear;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = rippleStyles;
        document.head.appendChild(rippleStyle);

        // Keyboard accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && document.activeElement.classList.contains('form-input')) {
                const inputs = Array.from(document.querySelectorAll('.form-input'));
                const currentIndex = inputs.indexOf(document.activeElement);
                
                if (currentIndex < inputs.length - 1) {
                    inputs[currentIndex + 1].focus();
                } else {
                    loginForm.dispatchEvent(new Event('submit'));
                }
            }
        });

