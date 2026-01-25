/* =========================================
   Global Variables & Data
   ========================================= */
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        title: "E-Ticaret Platformu",
        descFull: "Modern işletmeler için geliştirilmiş, yüksek performanslı ve ölçeklenebilir e-ticaret platformu. Gelişmiş stok takibi, detaylı raporlama, sanal POS entegrasyonu ve mobil uyumlu arayüzü ile tam kapsamlı bir satış deneyimi sunar.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "#private"
    },
    {
        title: "Kripto Trading Bot",
        descFull: "Binance API kullanarak çalışan, RSI ve MACD indikatörlerine dayalı otomatik al-sat botu. Gerçek zamanlı piyasa analizi yapar, stop-loss ve take-profit mekanizmaları ile riski minimize eder.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        techStack: ["Python", "Flask", "Socket.IO"],
        github: "https://github.com/SercanAkcelik/binance-chart-viewer"
    },
    {
        title: "YouTube Chat Bot",
        descFull: "Yayıncılar için geliştirilmiş akıllı moderasyon ve etkileşim asistanı. İstenmeyen kelimeleri filtreler, otomatik yanıt verir, anket oluşturur ve izleyici analizleri sunar. YouTube API v3 entegrasyonu.",
        image: "youtube-bot.png",
        techStack: [".NET 8.0", "WPF + XAML", "YouTube API v3"],
        github: "https://github.com/SercanAkcelik/YoutubeChatBot"
    },
    {
        title: "PLM Portal",
        descFull: "Kurumsal ürün yaşam döngüsü yönetim sistemi. Windchill PLM ile entegre çalışarak ürün verilerini, dokümanları ve revizyonları web tabanlı bir arayüzde sunar. Kullanıcı yetkilendirme ve iş akışı modülleri içerir.",
        image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=600&h=400&fit=crop",
        techStack: ["Python", "Flask", "REST API"],
        github: "#private"
    },
    {
        title: "Epin Marketplace",
        descFull: "Dijital oyun kodu ve hediye kartı satış platformu. Güvenli ödeme altyapısı (Iyzico), anında teslimat sistemi ve kullanıcı cüzdan yönetimi ile eksiksiz bir pazar yeri deneyimi.",
        image: "Epin.png",
        techStack: ["ASP.NET Core", "C#", "SQL Server"],
        github: "https://github.com/SercanAkcelik/epin-marketplace"
    }
];

/* =========================================
   Initialization & Preloader
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        const appContent = document.getElementById('appContent');

        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            appContent.classList.remove('hidden');
            appContent.classList.add('visible');

            // Init animations after load
            initAnimations();
            initTypewriter();
        }, 600);
    }, 2000);

    // Theme Logic
    initTheme();

    // Navbar Logic
    initNavbar();

    // Video Logic
    initVideoScroll();

    // Projects Modal Logic
    initProjectModals();

    // Contact Form Logic
    initContactForm();
});

/* =========================================
   Theme Management
   ========================================= */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    const isLight = savedTheme === 'light';

    if (isLight) {
        document.body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isNowLight = document.body.classList.contains('light-mode');

        localStorage.setItem('theme', isNowLight ? 'light' : 'dark');

        if (isNowLight) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

/* =========================================
   Navbar & Mobile Menu
   ========================================= */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll Effect (Smart Navbar)
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Background effect
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/Show effect
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down & moved past top
            navbar.classList.add('hidden');
        } else {
            // Scrolling Up
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });

    // Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* =========================================
   Typewriter Effect
   ========================================= */
function initTypewriter() {
    const roles = ['Full Stack Developer', 'Frontend Uzmanı', 'Backend Developer', 'Problem Çözücü'];
    const textElement = document.getElementById('typingText');
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        } else {
            typingSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(type, typingSpeed);
    }

    textElement.textContent = roles[0];
    setTimeout(type, 2000);
}

/* =========================================
   Video Scroll (GSAP)
   ========================================= */
function initVideoScroll() {
    // Mobile Check
    if (window.innerWidth < 768) {
        document.getElementById('video-showcase').style.display = 'none';
        return;
    }

    const video = document.getElementById('showcaseVideo');
    const section = document.getElementById('video-showcase');

    if (!video || !section) return;

    // 1. Pinning Trigger (Locks section)
    const isMobile = window.innerWidth < 768;
    const pinDuration = isMobile ? "+=150%" : "+=400%"; // Shorter pin on mobile

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: pinDuration,
        pin: true,
        pinSpacing: true
    });

    // 2. Video Control Trigger (Starts earlier)
    if (!isMobile) {
        ScrollTrigger.create({
            trigger: section,
            start: "top 35%", // Start playing when top of section is at 35% of viewport
            end: "+=450%",    // Extend duration to match/cover the pinning time
            scrub: 0.5,       // Reduced from 1.5 for faster response
            onUpdate: (self) => {
                try {
                    if (video.duration) {
                        const targetTime = self.progress * video.duration;
                        if (Number.isFinite(targetTime)) {
                            video.currentTime = targetTime;
                        }
                    }
                } catch (e) {
                    // Ignore minor seek errors
                }
            }
        });
    }

    // Text Overlay Animation
    const overlay = document.querySelector('.video-overlay');
    const text = document.querySelector('.video-text');

    if (overlay && text) {
        gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: pinDuration, // Match pin duration
                scrub: 1, // Match video scrub smoothness
            }
        })
            .to(text, {
                scale: 1.5,
                opacity: 0,
                filter: "blur(10px)",
                ease: "power1.in"
            });
    }

    // Refresh GSAP on video load
    video.addEventListener('loadedmetadata', () => {
        ScrollTrigger.refresh();
    });
}

/* =========================================
   Project Modals & Stacking Cards
   ========================================= */
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const cards = document.querySelectorAll('.project-card-stack');

    // Fill Modal Data
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('data-id'));
            const project = projectsData[id];

            if (project) {
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalDesc').textContent = project.descFull;
                document.getElementById('modalImage').src = project.image;

                const techContainer = document.getElementById('modalTech');
                techContainer.innerHTML = '';
                project.techStack.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });

                const githubLink = document.getElementById('modalGithub');
                if (project.github === '#private') {
                    githubLink.href = '#';
                    githubLink.innerHTML = '<i class="fas fa-lock" style="margin-right:8px;"></i> Gizli Proje';
                    githubLink.onclick = (e) => { e.preventDefault(); alert("Gizlilik nedeniyle bu projenin kodları paylaşılamaz."); }
                } else {
                    githubLink.href = project.github;
                    githubLink.innerHTML = '<i class="fab fa-github" style="margin-right:8px;"></i> GitHub';
                    githubLink.onclick = null;
                }

                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // GSAP Stack Animation (Desktop Only)
    if (window.innerWidth > 992) {
        const stackArea = document.querySelector('.stack-area');
        const cardElements = gsap.utils.toArray(".project-card-stack");

        if (cardElements.length === 0) return;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: stackArea,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true
            }
        });

        // Fly out animation
        if (cardElements[4]) tl.to(cardElements[4], { x: 600, y: -600, rotation: 45, opacity: 0, duration: 1 });
        if (cardElements[3]) tl.to(cardElements[3], { x: -600, y: -500, rotation: -45, opacity: 0, duration: 1 });
        if (cardElements[2]) tl.to(cardElements[2], { x: 600, y: 400, rotation: 30, opacity: 0, duration: 1 });
        if (cardElements[1]) tl.to(cardElements[1], { x: -600, y: 300, rotation: -30, opacity: 0, duration: 1 });
        if (cardElements[0]) tl.to(cardElements[0], { scale: 1.2, rotation: 0, duration: 1 });
    }
}

/* =========================================
   Animations & Contact Form
   ========================================= */
function initAnimations() {
    // Fade In Elements on Scroll
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    const btn = form.querySelector('button');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Loading State
        btn.disabled = true;
        btnText.textContent = ' Gönderiliyor...';
        btnIcon.className = 'fas fa-spinner fa-spin';

        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mpqpywbb", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showToast('Mesajınız başarıyla gönderildi!', 'success');
                form.reset();
            } else {
                showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            }
        } catch (error) {
            showToast('Bağlantı hatası oluştu.', 'error');
        } finally {
            btn.disabled = false;
            btnText.textContent = ' Mesaj Gönder';
            btnIcon.className = 'fas fa-paper-plane';
        }
    });

    function showToast(message, type) {
        toastMsg.textContent = message;
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
        } else {
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#ef4444';
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}
