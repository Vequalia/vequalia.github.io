document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll logic
    const revealElements = document.querySelectorAll('.reveal');
    
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

    // Internationalization (i18n)
    const translations = {
        'en': {
            'nav-about': 'About',
            'nav-oria': 'Oria',
            'nav-lamina': 'Lamina',
            'nav-keepass': 'KeePass',
            'nav-demo': 'Request a Demo',
            'hero-title-prefix': 'Intelligence for',
            'hero-title-suffix': 'A Better Self',
            'hero-subtitle': 'We craft AI not to replace humanity, but to refine it. Purpose-built tools to focus your mind, grow your prosperity, and protect your truth.',
            'oria-quote': '"Attention is the rarest and purest form of generosity."',
            'oria-status': 'Scheduled H2 2026',
            'lamina-quote': '"Nature is written in the language of mathematics."',
            'lamina-status': 'Scheduled H2 2026',
            'keepass-quote': '"Privacy is the power to selectively reveal oneself."',
            'keepass-status': 'Scheduled H1 2027',
            'footer-slogan': 'Elegance in Every Vector.',
            'footer-copyright': 'Copyright &copy; 2026 Vequalia Llc. All rights reserved.'
        },
        'zh': {
            'nav-about': '關於',
            'nav-oria': 'Oria',
            'nav-lamina': 'Lamina',
            'nav-keepass': 'KeePass',
            'nav-demo': '預約親身體驗',
            'hero-title-prefix': '智啟靈犀，',
            'hero-title-suffix': '淬鍊本真',
            'hero-subtitle': '我們研發人工智慧，非為取代，而在於昇華。透過精確設計的工具，助您澄明思緒、共築繁盛、守護真我之境。',
            'oria-quote': '「專注，是生命對世界最純粹的禮讚。」',
            'oria-status': '預計於 2026 年下半年啟航',
            'lamina-quote': '「萬象之本，皆由數理筆就。」',
            'lamina-status': '預計於 2026 年下半年啟航',
            'keepass-quote': '「隱私，是守護靈魂邊界的力量。」',
            'keepass-status': '預計於 2027 年上半年問世',
            'footer-slogan': '萬象歸一，優雅永恆。',
            'footer-copyright': '© 2026 Vequalia Llc. 保留所有權利。'
        },
        'zh-CN': {
            'nav-about': '关于',
            'nav-oria': 'Oria',
            'nav-lamina': 'Lamina',
            'nav-keepass': 'KeePass',
            'nav-demo': '预约亲身体验',
            'hero-title-prefix': '智启灵犀，',
            'hero-title-suffix': '淬炼本真',
            'hero-subtitle': '我们研发人工智能，非为取代，而在于升华。通过精确设计的工具，助您澄明思緒、共筑繁盛、守护真我之境。',
            'oria-quote': '“专注，是生命对世界最纯粹的礼赞。”',
            'oria-status': '预计于 2026 年下半年启航',
            'lamina-quote': '“万象之本，皆由数理笔就。”',
            'lamina-status': '预计于 2026 年下半年启航',
            'keepass-quote': '“隐私，是守护灵魂边界的力量。”',
            'keepass-status': '预计于 2027 年上半年问世',
            'footer-slogan': '万象归一，优雅永恒。',
            'footer-copyright': '© 2026 Vequalia Llc. 保留所有权利。'
        },
        'fr': {
            'nav-about': 'À Propos',
            'nav-oria': 'Oria',
            'nav-lamina': 'Lamina',
            'nav-keepass': 'KeePass',
            'nav-demo': 'Expérimenter la Démo',
            'hero-title-prefix': 'L\'intelligence pour',
            'hero-title-suffix': 'l\'Éveil du Soi',
            'hero-subtitle': 'Nous façonnons l\'intelligence artificielle non pour supplanter l\'humain, mais pour l\'exalter. Une suite d\'instruments ciselés pour la clarté de l\'esprit, la quête d\'abondance et le sanctuaire de votre vérité.',
            'oria-quote': '« L’attention est la forme la plus rare et la plus pure de la générosité. »',
            'oria-status': 'Éclosion prévue au S2 2026',
            'lamina-quote': '« Le livre de la nature est écrit en langage mathématique. »',
            'lamina-status': 'Éclosion prévue au S2 2026',
            'keepass-quote': '« La vie privée est le pouvoir de se révéler au monde avec parcimonie. »',
            'keepass-status': 'Éclosion prévue au S1 2027',
            'footer-slogan': 'L\'âme dans la mesure, l\'élégance dans le vecteur.',
            'footer-copyright': '© 2026 Vequalia Llc. Tous droits réservés.'
        }
    };

    const langLabels = {
        'en': 'English',
        'zh': '繁體中文',
        'zh-CN': '简体中文',
        'fr': 'Français'
    };

    let currentLang = localStorage.getItem('vequalia-lang') || 'en';

    function setLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (key.includes('copyright') || key.includes('slogan')) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('vequalia-lang', lang);
        
        // Update toggle button text
        const langBtn = document.getElementById('lang-btn');
        if (langBtn) {
            langBtn.textContent = langLabels[lang] || lang.toUpperCase();
        }
    }

    // Initialize language
    setLanguage(currentLang);

    // Language Dropdown Logic
    const langSwitcher = document.querySelector('.lang-switcher');
    const langBtn = document.getElementById('lang-btn');
    const langOptions = document.querySelectorAll('.lang-dropdown li');

    if (langBtn && langSwitcher) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('active');
        });

        langOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const lang = opt.getAttribute('data-lang');
                currentLang = lang;
                setLanguage(lang);
                langSwitcher.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langSwitcher.classList.remove('active');
        });
    }

    // Subtle parallax for watermarks
    window.addEventListener('scroll', () => {
        const watermarks = document.querySelectorAll('.section-watermark');
        watermarks.forEach(wm => {
            const speed = 0.05;
            const rect = wm.parentElement.getBoundingClientRect();
            const elementOffset = rect.top;
            if (elementOffset < window.innerHeight && elementOffset + rect.height > 0) {
                const yShift = elementOffset * speed;
                wm.style.transform = `translateY(calc(-50% + ${yShift}px))`;
            }
        });

        // Simple scale for visuals
        const visuals = document.querySelectorAll('.visual');
        visuals.forEach(visual => {
            const rect = visual.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const scale = 0.95 + (Math.max(0, Math.min(1, progress)) * 0.1);
                const canvas = visual.querySelector('[class$="-canvas"]');
                if (canvas) canvas.style.transform = `scale(${scale})`;
            }
        });
    }, { passive: true });
});
