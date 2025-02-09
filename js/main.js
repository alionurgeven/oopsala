document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav item is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            alert('Thank you for subscribing! We will keep you updated.');
            newsletterForm.reset();
        });
    }

    // Add animation class to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.highlight-card, .featured-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);

    // Instagram carousel functionality
    const carousel = document.querySelector('.instagram-carousel');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    
    if (carousel && prevButton && nextButton) {
        const scrollAmount = carousel.offsetWidth;
        let autoScrollInterval;
        let isHovered = false;
        
        const scrollToNext = () => {
            const maxScroll = carousel.scrollWidth - carousel.offsetWidth;
            const nextScrollPosition = carousel.scrollLeft + scrollAmount;
            
            if (nextScrollPosition > maxScroll) {
                // If we're at the end, scroll back to start
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        };
        
        const scrollToPrev = () => {
            const prevScrollPosition = carousel.scrollLeft - scrollAmount;
            
            if (prevScrollPosition < 0) {
                // If we're at the start, scroll to end
                carousel.scrollTo({
                    left: carousel.scrollWidth - carousel.offsetWidth,
                    behavior: 'smooth'
                });
            } else {
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        };
        
        // Auto scroll functionality
        const startAutoScroll = () => {
            if (!isHovered) {
                autoScrollInterval = setInterval(scrollToNext, 6500); // Auto scroll every 6.5 seconds
            }
        };
        
        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };
        
        // Event listeners for hover
        carousel.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoScroll();
        });
        
        carousel.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoScroll();
        });
        
        // Navigation button event listeners
        prevButton.addEventListener('click', () => {
            scrollToPrev();
            stopAutoScroll();
            startAutoScroll();
        });
        
        nextButton.addEventListener('click', () => {
            scrollToNext();
            stopAutoScroll();
            startAutoScroll();
        });
        
        // Start auto-scrolling
        startAutoScroll();
    }
}); 
