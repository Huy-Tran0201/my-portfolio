// ==================== NAVIGATION & MENU ==================== 
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ==================== 
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== 
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.borderBottomColor = 'rgba(0, 212, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.8)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    }
});

// ==================== SCROLL TO TOP BUTTON ==================== 
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== LOADING ANIMATION ==================== 
window.addEventListener('load', () => {
    const loadingContainer = document.getElementById('loadingContainer');
    setTimeout(() => {
        loadingContainer.style.opacity = '0';
        loadingContainer.style.visibility = 'hidden';
    }, 1500);
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation on scroll
document.querySelectorAll('[class*="card"], [class*="item"], h2, p').forEach(element => {
    observer.observe(element);
});

// ==================== CONTACT FORM HANDLING ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            button.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            button.style.background = 'linear-gradient(135deg, #6bcf7f, #10b981)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 2000);

        // In a real application, you would send this data to your server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// ==================== SKILL PROGRESS BAR ANIMATION ==================== 
const skillProgressBars = document.querySelectorAll('.skill-progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ==================== PARALLAX EFFECT ON HERO ==================== 
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ==================== SMOOTH SCROLL NAVIGATION ACTIVE STATE ==================== 
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== RIPPLE EFFECT ON BUTTONS ==================== 
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - this.offsetLeft;
        const y = e.clientY - this.offsetTop;

        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = '20px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleAnimation 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== COUNTER ANIMATION FOR STATS ==================== 
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = Math.ceil(target) + '+';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(stat);
            }
        });

        observer.observe(stat);
    });
}

// Call counter animation
animateCounters();

// ==================== TEXT ANIMATION ==================== 
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
}

// ==================== DARK MODE SUPPORT (Optional) ==================== 
// Check for system dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// ==================== KEYBOARD SHORTCUTS ==================== 
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        scrollToSection('#home');
    }
    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        scrollToSection('#contact');
    }
    // Press 'Esc' to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== INITIALIZE AOS-LIKE ANIMATIONS ==================== 
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('[class*="fade"]');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.8s ease-out ${index * 0.1}s`;
    });

    window.addEventListener('load', () => {
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    });
}

initializeAnimations();

// ==================== CONSOLE MESSAGE ==================== 
console.log('%c Welcome to My Portfolio! ', 'color: #00d4ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0,212,255,0.5);');
console.log('%c Made with HTML, CSS, and JavaScript ', 'color: #7c3aed; font-size: 12px;');
console.log('%c Feel free to explore the code and get inspired! ', 'color: #a0aec0; font-size: 12px;');