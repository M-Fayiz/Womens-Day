// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (document.querySelector('.nav-menu').classList.contains('active')) {
                    document.querySelector('.nav-menu').classList.remove('active');
                    document.querySelector('.menu-toggle').classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Add 'active' class to menu toggle bars
    mobileMenu.addEventListener('click', function() {
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Testimonial Slider
    const sliderTrack = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const slideWidth = 100; // 100% width

    // Set initial position
    updateSlider();

    // Event listeners for controls
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);

    // Contact Form Floating Labels
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add placeholder attribute
        input.setAttribute('placeholder', ' ');
        
        // Handle focus events for styling
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value && email.value && message.value) {
                // Simulate form submission
                contactForm.reset();
                alert('Thank you for your message! We will get back to you soon.');
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Initialize GSAP animations
    // Hero section animations
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1
    });
    
    gsap.from('.tagline', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6
    });

    // Scroll trigger animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for the causes section background
    gsap.to('.parallax-bg', {
        scrollTrigger: {
            trigger: '.causes',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });
    
    // Timeline section animations
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const direction = i % 2 === 0 ? 50 : -50;
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: direction,
            duration: 1
        });
    });

    // Counters for the achievements section (example)
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length > 0) {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => {
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCounter, 10);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                },
                once: true
            });
        });
    }
});