/**
 * Main JavaScript for Urmila Jagdale Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });

    // 3. Typing Effect
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Embedded Software Engineer",
        "Systems Designer",
        "RTOS Enthusiast",
        "Protocol Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Navbar Scroll Effect & Scroll Progress
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Navbar shadow/blur on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.remove('scrolled', 'py-2');
            navbar.classList.add('py-3');
        }

        // Scroll progress calculation
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    });

    // 5. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Stagger Animations
    const heroTl = gsap.timeline();
    heroTl.from("#hero h1", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
    .from("#hero p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5")
    .from("#hero .flex-col", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

    // Section Reveal Animations
    gsap.utils.toArray('section').forEach(section => {
        // We animate the contents of the section for a better effect
        const sectionContent = section.querySelectorAll('h2, h3, .grid, .max-w-4xl, .max-w-5xl');
        
        if (sectionContent.length > 0) {
            gsap.from(sectionContent, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
    });

    // Skill Bar Animations
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            },
            width: bar.getAttribute('data-progress'),
            duration: 1.5,
            ease: "power2.out"
        });
    });

    // Project Card Hover Animation (GSAP for smoothness)
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
             gsap.to(card, { y: -10, scale: 1.02, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
             gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        });
    });

    // 6. Custom Cursor (Enabled if not mobile)
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                opacity: 1
            });
            gsap.to(cursorBlur, {
                x: e.clientX - 80, // Offset for center
                y: e.clientY - 80,
                duration: 0.5,
                opacity: 1
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorBlur.style.opacity = '0';
        });

        // Expand cursor on links
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(14, 165, 233, 0.2)', borderWidth: '1px', duration: 0.3 });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderWidth: '2px', duration: 0.3 });
            });
        });
    }

    // 7. Year update
    document.getElementById('year').textContent = new Date().getFullYear();

    // 8. Contact Form Handling removed as per user request (form removed from HTML)
});
