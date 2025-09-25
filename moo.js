    // app.js — interactions: smooth scroll, nav toggle, contact appear, chart demo, contact form
    document.addEventListener('DOMContentLoaded', () => {
    // set footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // NAV toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // accessibility focus
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            setTimeout(() => target.removeAttribute('tabindex'), 1000);

            // close mobile nav if open
            if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            }
        }
        });
    });

    // CONTACT: show when scrolled into view (IntersectionObserver)
    const contactSection = document.querySelector('.contact-section');
    if (contactSection && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            contactSection.classList.add('visible');
            }
        });
        }, { root: null, rootMargin: '0px', threshold: 0.15 });
        io.observe(contactSection);
    } else if (contactSection) {
        contactSection.classList.add('visible');
    }

    // Chart.js demo (replace with your real data)
    try {
        const ctx = document.getElementById('demoChart').getContext('2d');
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018','2019','2020','2021','2022','2023'],
            datasets: [{
            label: 'Temperature anomaly (°C)',
            data: [0.2,0.25,0.3,0.45,0.5,0.6],
            borderColor: '#f0d57a',
            backgroundColor: 'rgba(212,175,55,0.06)',
            tension: 0.3,
            pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
            x: { grid: { display: false }, ticks: { color: '#9fb8d8' } },
            y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#9fb8d8' } }
            },
            plugins: { legend: { labels: { color: '#f0d57a' } } }
        }
        });
    } catch (err) {
        // Chart lib not loaded or canvas missing — ignore silently
        console.warn('Chart init error', err);
    }

    // Contact form handling (client-side simulation)
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    if (contactForm && contactStatus) {
        contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactStatus.textContent = '';
        if (!contactForm.checkValidity()) {
            contactStatus.textContent = 'Please complete required fields.';
            contactStatus.style.color = 'tomato';
            return;
        }
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        contactStatus.style.color = '#87ceeb';
        contactStatus.textContent = 'Sending message...';

        // simulate network call (replace with real API/EmailJS)
        setTimeout(() => {
            contactStatus.textContent = 'Message sent — thank you!';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send';
            contactForm.reset();
        }, 900);
        });
    }

    // ESC closes mobile nav if open
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
        if (navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        }
    });
    });
