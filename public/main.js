document.addEventListener('DOMContentLoaded', () => {
    // Scroll performance optimization variables
    let isScrolling = false;
    const visuals = document.querySelectorAll('.visual');
    const revealElements = document.querySelectorAll('.reveal');

    // Reveal on scroll logic
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Handle elements already in view
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Language Dropdown Logic
    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.getElementById('lang-btn');

    if (langBtn && langSwitcher) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            langSwitcher.classList.remove('active');
        });
    }

    // Automatic Language Redirection (Only on root / index.html)
    const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/zh/') && !window.location.pathname.includes('/sc/') && !window.location.pathname.includes('/fr/');
    
    if (isRoot && !localStorage.getItem('vequalia-lang-set')) {
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        let targetPath = null;

        if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk') || browserLang.startsWith('zh-mo')) {
            targetPath = 'zh/';
        } else if (browserLang.startsWith('zh')) {
            targetPath = 'sc/';
        } else if (browserLang.startsWith('fr')) {
            targetPath = 'fr/';
        }

        if (targetPath) {
            localStorage.setItem('vequalia-lang-set', 'true');
            window.location.href = targetPath;
        }
    }

    // Set preference when clicking a language link manually
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('vequalia-lang-set', 'true');
        });
    });

    // Parallax and Visual Animation Throttled with requestAnimationFrame
    function updateScrollAnimations() {
        visuals.forEach(visual => {
            const rect = visual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const scale = 0.95 + (Math.max(0, Math.min(1, progress)) * 0.1);
                const canvas = visual.querySelector('[class$="-canvas"]');
                if (canvas) canvas.style.transform = `scale(${scale})`;
            }
        });

        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollAnimations);
            isScrolling = true;
        }
    }, { passive: true });
});
