import { content } from './content.js';


let currentLang = 'fr';


const elements = {
    langSwitch: document.getElementById('lang-switch'),
    mobileLangSwitch: document.getElementById('mobile-lang-switch'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    closeMenuBtn: document.getElementById('close-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    navbar: document.getElementById('navbar'),
    servicesGrid: document.getElementById('services-grid'),
    portfolioGrid: document.getElementById('portfolio-grid'),
    yearSpan: document.getElementById('year'),
    mobileLinks: document.querySelectorAll('.mobile-link')
};


document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();
    

    elements.yearSpan.textContent = new Date().getFullYear();


    initAnimations();


    renderServices();
    renderPortfolio();
    

    setupEventListeners();
});


function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);


    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.to('.hero-visual', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });


    document.querySelectorAll('.fade-on-scroll').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}


function renderServices() {
    const data = content[currentLang].services.items;
    elements.servicesGrid.innerHTML = data.map((item, index) => `
        <div class="glass-panel p-8 rounded-2xl glass-card transition-all duration-300 group fade-on-scroll" style="transition-delay: ${index * 50}ms">
            <div class="w-12 h-12 bg-lynx-neon/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lynx-neon group-hover:text-black transition-colors text-lynx-neon">
                <i data-lucide="${item.icon}" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-lynx-neon transition-colors">${item.title}</h3>
            <p class="text-lynx-muted text-sm leading-relaxed group-hover:text-gray-300 transition-colors">${item.desc}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderPortfolio() {
    const data = content[currentLang].portfolio.items;
    elements.portfolioGrid.innerHTML = data.map((item, index) => `
        <div class="group relative rounded-xl overflow-hidden cursor-pointer fade-on-scroll shadow-lg" style="transition-delay: ${index * 100}ms">
            <div class="aspect-[4/3] overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-lynx-dark/90 via-lynx-dark/40 to-transparent opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p class="text-lynx-neon text-xs font-bold uppercase tracking-wider mb-1">${item.category}</p>
                <h3 class="text-xl font-bold text-white mb-4">${item.title}</h3>
                <div class="inline-flex items-center text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0">
                    ${currentLang === 'fr' ? 'Voir le projet' : 'View Project'} <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}


function switchLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    

    elements.langSwitch.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    elements.mobileLangSwitch.textContent = currentLang === 'fr' ? 'Switch to English' : 'Passer en Français';


    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        const keys = key.split('.');
        let value = content[currentLang];
        keys.forEach(k => {
            if (value) value = value[k];
        });
        if (value) el.textContent = value;
    });


    renderServices();
    renderPortfolio();
    

    ScrollTrigger.refresh();
}


function setupEventListeners() {

    elements.langSwitch.addEventListener('click', switchLanguage);
    elements.mobileLangSwitch.addEventListener('click', () => {
        switchLanguage();
        toggleMobileMenu();
    });


    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    elements.closeMenuBtn.addEventListener('click', toggleMobileMenu);
    

    elements.mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });


    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `<span class="animate-pulse">Envoi en cours...</span>`;
        btn.disabled = true;
        

        setTimeout(() => {
            btn.innerHTML = `<span class="text-green-400">Message Envoyé !</span>`;
            e.target.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });


    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('bg-lynx-dark/95', 'shadow-lg');
            elements.navbar.classList.remove('bg-lynx-dark/80');
        } else {
            elements.navbar.classList.remove('bg-lynx-dark/95', 'shadow-lg');
            elements.navbar.classList.add('bg-lynx-dark/80');
        }
    });
}

function toggleMobileMenu() {
    const isOpen = !elements.mobileMenu.classList.contains('translate-x-full');
    if (isOpen) {
        elements.mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
    } else {
        elements.mobileMenu.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
    }
}
