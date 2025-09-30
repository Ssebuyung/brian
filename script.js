// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactFormValidation) {
        contactFormValidation.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading message
            formStatus.innerHTML = '<p class="sending">Sending message...</p>';
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'Brian Ssebuyungo',
                reply_to: email
            };
            
            // Send email using EmailJS
            emailjs.send('default_service', 'template_id', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Display success message
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent Successfully!</h3>
                            <p>Thank you ${name} for your message. I'll get back to you soon at ${email}.</p>
                        </div>
                    `;
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                    }, 5000);
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Display error message
                    formStatus.innerHTML = `
                        <div class="error-message">
                            <i class="fas fa-exclamation-circle"></i>
                            <h3>Message Failed to Send</h3>
                            <p>Sorry, there was a problem sending your message. Please try again or contact me directly at ssebuyungobrian5@gmail.com</p>
                        </div>
                    `;
                });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering functionality
    const projectFilters = document.querySelectorAll('.project-filter button');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remove active class from all filters
                projectFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                filter.classList.add('active');
                
                const category = filter.getAttribute('data-filter');
                
                projectItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Skills progress animation
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    // Animate skill bars when they come into view
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
                bar.classList.add('animated');
            }
        });
    };
    
    // Run on scroll and on page load
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // Form validation for contact form
    const contactFormValidation = document.getElementById('contactForm');
    
    if (contactFormValidation) {
        contactFormValidation.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Name is required');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Message is required');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                const formStatus = document.createElement('div');
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Message sent successfully!';
                contactForm.appendChild(formStatus);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    formStatus.remove();
                }, 3000);
            }
        });
    }
    
    function markInvalid(input, message) {
        input.classList.add('invalid');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
        } else {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = message;
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }
    
    function markValid(input) {
        input.classList.remove('invalid');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Theme toggle functionality (light/dark mode)
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use preferred color scheme
        const currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.checked = currentTheme === 'dark';
        
        // Toggle theme when button is clicked
        themeToggle.addEventListener('change', function() {
            const theme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }
});