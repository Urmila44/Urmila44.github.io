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

    // 3. Typing Effect (GSAP can be used here for more control, but keeping the current logic fixed)
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Embedded Software Engineer",
        "Aerospace Systems Specialist",
        "RTOS & Linux Developer",
        "Safety-Critical Systems Expert"
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
    if (typingText) type();

    // 3.1 Mobile Menu Logic
    const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuTrigger && mobileMenu) {
        mobileMenuTrigger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeMobileMenu.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

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

    // Project Modal Logic
    const projectModal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    const projectBtns = document.querySelectorAll('.project-details-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalContent = document.getElementById('modal-content');

    const projectData = {
        'renu-hmi': {
            title: 'Renu Industrial HMI',
            icon: 'monitor',
            content: `
                <p><strong>Technical Challenge:</strong> Modernizing industrial interfaces for high-concurrency data visualization in harsh environments.</p>
                <p><strong>Core Contribution:</strong> Lead the migration from legacy graphics libraries to <span class="text-primary-600">Qt and LVGL</span>, implementing a custom event-driven architecture for sensor updates.</p>
                <p><strong>Impact:</strong> Achieved a 45% reduction in UI latency and successfully deployed to over 500 industrial units globally.</p>
                <div class="flex flex-wrap gap-2 mt-4">
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">C++</span>
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">Embedded Linux</span>
                    <span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">Modbus</span>
                </div>
            `
        },
        'honeywell-nfms': {
            title: 'Honeywell NFMS (Airbus)',
            icon: 'plane',
            content: `
                <p><strong>Technical Challenge:</strong> Implementing safety-critical communication stacks for the A320/A350 Flight Management System.</p>
                <p><strong>Core Contribution:</strong> Developed robust drivers for <span class="text-indigo-600">ARINC429 and AFDX</span> protocols. Conducted extensive HIL (Hardware-in-the-Loop) testing to satisfy DO-178C certification requirements.</p>
                <p><strong>Impact:</strong> Zero critical defects found during the final integration phase; software now operating in commercial flights worldwide.</p>
                <div class="flex flex-wrap gap-2 mt-4">
                    <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs">Ada</span>
                    <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs">Safety-Critical</span>
                    <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs">ARINC429</span>
                </div>
            `
        },
        'smart-meter': {
            title: 'Smart Meter IoT',
            icon: 'zap',
            content: `
                <p><strong>Technical Challenge:</strong> High-precision power monitoring on low-power STM32 microcontrollers with real-time cloud reporting.</p>
                <p><strong>Core Contribution:</strong> Implemented <span class="text-cyan-600">FreeRTOS-based firmware</span> for concurrent data sampling and MQTT communication. Developed a custom power-saving algorithm for battery-operated variants.</p>
                <p><strong>Impact:</strong> Deployment of 10,000+ units in smart city trials, providing grid operators with real-time consumption analytics.</p>
                <div class="flex flex-wrap gap-2 mt-4">
                    <span class="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-lg text-xs">STM32</span>
                    <span class="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-lg text-xs">MQTT</span>
                    <span class="px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-lg text-xs">Edge Computing</span>
                </div>
            `
        }
    };

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-project');
            const data = projectData[id];
            
            if (data) {
                modalTitle.textContent = data.title;
                modalIcon.setAttribute('data-lucide', data.icon);
                modalContent.innerHTML = data.content;
                lucide.createIcons(); // Re-render icon in modal
                
                projectModal.classList.remove('hidden');
                setTimeout(() => projectModal.classList.add('active'), 10);
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeProjectModal = () => {
        projectModal.classList.remove('active');
        setTimeout(() => projectModal.classList.add('hidden'), 300);
        document.body.style.overflow = '';
    };

    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
        projectModal.querySelector('.modal-overlay').addEventListener('click', closeProjectModal);
    }

    // 9. Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarElement = document.getElementById('navbar');
                const navHeight = navbarElement ? navbarElement.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
