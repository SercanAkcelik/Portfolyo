/* =========================================
   Global Variables & Data
   ========================================= */
gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        title: "LezzetBurger - Restoran Yönetimi",
        descFull: "Restoran operasyonlarını dijitalleştiren kapsamlı web çözümü. Dinamik dijital menü, online rezervasyon sistemi ve detaylı yönetim paneli (Dashboard, CRUD işlemler) içerir. Katmanlı Mimari (N-Tier), Entity Framework Core ve Repository Pattern prensipleriyle geliştirilmiş profesyonel bir showcase projesidir.",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
        techStack: ["ASP.NET Core MVC", "Entity Framework Core", "MS SQL Server", "Bootstrap"],
        github: "https://github.com/SercanAkcelik/AspNet-Core-Restaurant-App"
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
    // Terminal Boot Sequence
    const terminalWindow = document.getElementById('terminalWindow');
    const preloader = document.getElementById('preloader');
    const appContent = document.getElementById('appContent');

    const bootMessages = [
        { text: "Initializing Systems...", type: "system" },
        { text: "Loading Profile: Sercan Akçelik", type: "normal" },
        { text: "Connecting GitHub...", type: "warning" },
        { text: "Fetching Data... [OK]", type: "success" },
        { text: "Starting UI v2.0...", type: "system" },
        { text: "Ready. Launching...", type: "success" }
    ];

    async function typeWriter(text, element, speed = 10) { // Faster typing (10ms)
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            terminalWindow.scrollTop = terminalWindow.scrollHeight;
            await new Promise(r => setTimeout(r, speed));
        }
    }

    async function runBootSequence() {
        const cursor = document.querySelector('.cursor');

        // Scroll Lock: Prevent scrolling during loading
        document.body.style.overflow = 'hidden';

        for (const msg of bootMessages) {
            const line = document.createElement('div');
            line.className = `terminal-line ${msg.type}`;
            line.textContent = '> '; // Prompt symbol

            terminalWindow.insertBefore(line, cursor);

            // Type the text content
            await typeWriter(msg.text, line);

            // Minimal pause between lines (30ms)
            await new Promise(r => setTimeout(r, 30));
        }

        // Final completion (100ms)
        await new Promise(r => setTimeout(r, 100));

        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            appContent.classList.remove('hidden');
            appContent.classList.add('visible');

            // Scroll Unlock: Re-enable scrolling
            document.body.style.overflow = '';

            // Start Site Animations
            initAnimations();
            initTypewriter();
            initCodeParticles(); // Start Particles

            // Signal that preloader is done (for deep-link handling)
            window.dispatchEvent(new Event('preloaderDone'));
        }, 200); // Faster fade out
    }

    // Start the sequence
    runBootSequence();

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
    const roles = ['Full Stack Developer', 'Web Arayüzleri', 'Backend Mimarisi', 'Modern Çözümler'];
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

/* =========================================
   Hero Code Particles Effect
   ========================================= */
function initCodeParticles() {
    const container = document.getElementById('codeParticles');
    if (!container) return;

    const symbols = ['{ }', '</>', '&&', '||', '=>', 'func', 'const', 'let', 'if', 'return', '[ ]', '01', 'API', 'JSON'];

    // Performance Optimization: Reduce particles on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;
    const particles = [];

    // Mouse Tracking
    let mouse = { x: -1000, y: -1000 };

    // Disable expensive operations on mobile
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    }

    // Get container dimensions securely
    const getContainerWidth = () => container.offsetWidth > 0 ? container.offsetWidth : window.innerWidth;
    const getContainerHeight = () => container.offsetHeight > 0 ? container.offsetHeight : window.innerHeight;

    // Particle Class
    class Particle {
        constructor() {
            this.element = document.createElement('span');
            this.element.classList.add('code-particle');
            this.element.textContent = symbols[Math.floor(Math.random() * symbols.length)];

            container.appendChild(this.element);

            // Style Config
            const colors = ['var(--accent-primary)', 'var(--accent-cyan)', 'var(--accent-emerald)', 'var(--text-muted)'];
            this.element.style.color = colors[Math.floor(Math.random() * colors.length)];
            this.element.style.fontSize = `${Math.random() * (1.5 - 0.8) + 0.8}rem`;
            this.element.style.opacity = Math.random() * 0.5 + 0.1;

            // Physics Stats (Random Position across full width)
            // Use window.innerWidth to ensure we cover the screen even if container has issues
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            // Allow negative offset for immediate left-side coverage
            this.x = (Math.random() * (screenWidth + 100)) - 50;
            this.y = Math.random() * screenHeight;

            // Left <-> Right Random Drift (Balanced)
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.5;

            // Interaction Stats
            this.friction = 0.96;
            this.ease = 0.1;

            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }

        update() {
            // 1. Natural Floating
            this.x += this.vx;
            this.y += this.vy;

            // Boundary Wrap (Seamless)
            const padding = 50;
            const width = getContainerWidth();
            const height = getContainerHeight();

            if (this.x > width + padding) {
                this.x = -padding;
                this.y = Math.random() * height;
            }
            if (this.x < -padding) this.x = width + padding;

            if (this.y < -padding) this.y = height + padding;
            if (this.y > height + padding) this.y = -padding;

            // 2. Mouse Interaction (Stronger Push) - Disabled on Mobile
            if (!isMobile) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const radius = 250; // Increased impact range

                if (distance < radius) {
                    const force = (radius - distance) / radius;
                    const angle = Math.atan2(dy, dx);
                    // Much stronger push (High impact)
                    const pushX = Math.cos(angle) * force * 8;
                    const pushY = Math.sin(angle) * force * 8;

                    this.x -= pushX;
                    this.y -= pushY;
                }
            }

            // Apply Position
            this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    // Init Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        particles.forEach(p => p.update());
        requestAnimationFrame(animate);
    }
    animate();
}

/* =========================================
   Blog System (Overlay & Data)
   ========================================= */
const blogData = [
    {
        id: 4,
        slug: "dotnet-teknoloji-devinin-evrimi",
        title: ".NET: Bir Teknoloji Devinin Evrimi ve Modern Dönüşümü",
        date: "9 Şubat 2026",
        tag: "Teknoloji Tarihi",
        excerpt: "Microsoft'un 2000'lerin başında \"Windows için uygulama geliştirme\" vizyonuyla yola çıktığı bu dev gemi, bugün her platformda çalışan modern bir hız teknesine nasıl dönüştü?",
        content: `
            <p>Yazılım dünyasında bazı teknolojiler vardır ki, sadece bir "araç" olmaktan öte, bir dönemi tanımlarlar. Microsoft'un .NET ekosistemi de bunlardan biri. 2000'lerin başında "Windows için uygulama geliştirme" vizyonuyla yola çıkan bu dev gemi, bugün her platformda çalışan, açık kaynaklı ve modern bir hız teknesine dönüştü.</p>
            <p>Gelin, bu 20 yıllık serüvene ve .NET'in kabuk değiştirmesine yakından bakalım.</p>

            <h2>1. Başlangıç: .NET Framework ve Windows İmparatorluğu (2002)</h2>
            <p>2000'li yılların başına dönelim. Web dünyası henüz emekliyor, Java "Write once, run anywhere" sloganıyla ortalığı kasıp kavuruyordu. Microsoft'un buna cevabı <strong>.NET Framework</strong> oldu.</p>
            <p>Amaç basitti ama iddialıydı: C++, Visual Basic gibi farklı dilleri konuşan geliştiricileri aynı çatı altında (CLR - Common Language Runtime) toplamak. Artık hangi dilde yazdığınızın önemi yoktu; hepsi aynı makine diline derleniyordu.</p>
            <p>Bu dönemde .NET demek, Windows demekti.</p>
            <ul>
                <li><strong>Masaüstünde:</strong> WinForms ile sürükle-bırak kolaylığında uygulamalar geliştirdik. Sonrasında gelen WPF, arayüz tasarımına XAML ile bambaşka bir boyut kazandırdı.</li>
                <li><strong>Webde:</strong> ASP.NET, masaüstü geliştirme deneyimini web'e taşıdı. Ancak o dönemin "Web Forms" yapısı, HTTP'nin vatansız (stateless) doğasını gizlemeye çalışan ağır bir soyutlamaydı.</li>
            </ul>

            <h2>2. Web'in Olgunlaşması: ASP.NET MVC Devrimi</h2>
            <p>Yıllar geçtikçe web standartları değişti. Geliştiriciler HTML üzerinde tam kontrol istiyordu. Microsoft bu çağrıya <strong>ASP.NET MVC</strong> ile yanıt verdi.</p>
            <p>"Sürükle bırak" devri kapanmış, yerini "Model-View-Controller" mimarisinin temizliği ve disiplini almıştı. Bu, modern web geliştirmeye atılan ilk ciddi adımdı ama hala bir sorun vardı: Her şey hala Windows Sunucularına (IIS) ve devasa <code>System.Web</code> kütüphanesine bağımlıydı.</p>
            
            <h2>3. Kırılma Noktası: .NET Core ve Açık Kaynak Rüzgarı (2016)</h2>
            <p>2016 yılı, Microsoft tarihinde bir milattır. Satya Nadella vizyonuyla şirket, "Windows-First" yaklaşımından "Cloud-First, Mobile-First" yaklaşımına geçti. Ve <strong>.NET Core</strong> doğdu.</p>
            <p>Bu sadece bir sürüm güncellemesi değildi; bu bir felsefe değişimiydi.</p>
            <ul>
                <li><strong>Platform Bağımsız:</strong> Artık kodunuzu Windows'ta yazıp, maliyeti düşük Linux sunucularda veya macOS üzerinde çalıştırabiliyordunuz.</li>
                <li><strong>Performans:</strong> Eski hantal yapılar atıldı. Modüler, hafif ve inanılmaz hızlı bir yapı inşa edildi.</li>
                <li><strong>Açık Kaynak:</strong> Microsoft kodlarını GitHub'a açtı. Artık .NET, topluluğun da katkı verebildiği canlı bir organizmaydı.</li>
            </ul>

            <h2>4. Modern Web'in Gücü: ASP.NET Core</h2>
            <p>Eski ASP.NET ile ASP.NET Core arasındaki fark, nostaljik bir Amerikan arabasıyla modern bir elektrikli araç arasındaki fark gibidir. ASP.NET Core ile birlikte:</p>
            <ul>
                <li><strong>Dependency Injection (Bağımlılık Enjeksiyonu)</strong> framework'ün kalbine yerleştirildi.</li>
                <li><strong>Middleware (Ara Yazılım)</strong> yapısı sayesinde HTTP isteklerini yönetmek esnekleşti.</li>
                <li><strong>Konteyner Dostu:</strong> Docker ve Kubernetes ile mükemmel uyum sağlandı.</li>
            </ul>
            <p>Bugün bir startup veya kurumsal dev fark etmeksizin, yeni bir projeye başlanacaksa adres bellidir: <strong>ASP.NET Core.</strong></p>

            <h2>5. Büyük Birleşme: .NET 5 ve Sonrası</h2>
            <p>Microsoft bir süre boyunca "Framework" (Eski/Windows) ve "Core" (Yeni/Cross-Platrom) yapılarını paralel götürdü. Bu durum kafa karışıklığı yaratınca, 2020'de "Core" takısını atıp yola sadece <strong>.NET</strong> olarak devam etme kararı alındı (.NET 5).</p>
            <p>Artık "Hangi versiyonu kullanmalıyım?" sorusu yok.</p>
            <ul>
                <li><strong>Tek Platform:</strong> Web, Mobil, Masaüstü, Bulut, AI... Hepsi tek bir SDK, tek bir BCL (Base Class Library) üzerinde.</li>
                <li><strong>Sürekli Evrim:</strong> Her yıl kasım ayında yeni bir ana sürüm (.NET 6, 7, 8...) yayınlanıyor ve performans limitleri sürekli zorlanıyor.</li>
            </ul>

            <h2>6. 2026 Güncellemesi: Zirveye Yolculuk ve TIOBE Ödülü</h2>
            <p>TIOBE Index Ocak 2026 raporuna göre C#, <strong>2025 yılının Programlama Dili</strong> seçildi. Son 3 yılda ikinci kez bu unvanı kazanan C#, yıllık bazda en büyük artışı (<strong>%2.94</strong>) göstererek popülaritesini kanıtladı.</p>
            <p>TIOBE CEO'su Paul Jansen'in de belirttiği gibi, C# bir zamanlar Windows'a hapsolmuş bir dildi. Ancak bugün gerçekleştirdiği iki büyük paradigma değişimi (Windows'tan Çapraz Platforma ve Microsoft mülkiyetinden Açık Kaynağa geçiş) sayesinde her alanda güçlü bir oyuncu haline geldi.</p>
            <p>2025 yılında C ve C++ yer değiştirirken, C# istikrarlı yükselişini sürdürdü ve Java ile olan rekabetinde gücünü korudu. Veri biliminde R'ın yükselişi ve Perl'in geri dönüşü gibi sürprizlerin yanında, C#'ın bu başarısı onun sadece "kurumsal" değil, "evrensel" bir dil olma yolunda olduğunu gösteriyor.</p>

            <h3>Sonuç: Neden Bugün .NET?</h3>
            <p>Eskiden .NET, "Kurumsal şirketlerin hantal teknolojisi" olarak görülürdü. Bugün ise Stack Overflow anketlerinde "En çok sevilen framework" listelerinin zirvesinde oynuyor.</p>
            <p>C#'ın modern yetenekleri, Visual Studio gibi güçlü IDE'ler ve arkasındaki devasa toplulukla .NET; sadece bir kodlama ortamı değil, sürdürülebilir bir kariyer yatırımıdır. İster bir mobil oyun yapın, ister milyonlarca isteği karşılayan bir mikroservis mimarisi kurun; .NET'in alet çantasında size uygun bir çözüm mutlaka var.</p>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initBlogSystem();
});

function initBlogSystem() {
    console.log("Initializing Blog System...");

    const blogLink = document.getElementById('blogLink');
    const blogOverlay = document.getElementById('blogOverlay');
    const closeBlogBtn = document.getElementById('closeBlog');
    const blogList = document.getElementById('blogList');
    const blogDetail = document.getElementById('blogDetail');
    const backToBlogBtn = document.getElementById('backToBlog');

    // Blog Elements
    const articleTitle = document.getElementById('articleTitle');
    const articleDate = document.getElementById('articleDate');
    const articleTag = document.getElementById('articleTag');
    const articleContent = document.getElementById('articleContent');

    if (!blogLink) console.error("Blog Link not found!");
    if (!blogOverlay) console.error("Blog Overlay not found!");

    if (!blogLink || !blogOverlay) return;

    // Open Overlay
    blogLink.addEventListener('click', (e) => {
        console.log("Blog Link Clicked!");
        e.preventDefault();
        e.stopPropagation(); // Stop bubbling to prevent navbar from closing implicitly if it interferes

        blogOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        renderBlogList();
        history.pushState(null, null, '#blog'); // Set generic blog hash
    });

    // Close Overlay
    closeBlogBtn.addEventListener('click', () => {
        blogOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            showListView(); // Reset view when closed
        }, 400);
        history.pushState(null, null, window.location.pathname); // Clear hash properly
    });

    // Back to List
    if (backToBlogBtn) {
        backToBlogBtn.addEventListener('click', () => {
            showListView();
            history.pushState(null, null, '#blog'); // Return to generic blog hash
        });
    }

    console.log("Blog System Initialized Successfully");

    // Handle Deep Linking on Load
    function checkHash() {
        const hash = window.location.hash.substring(1); // Remove '#'

        // If hash is empty, close overlay (handles back button)
        if (!hash || hash.trim() === '') {
            if (blogOverlay.classList.contains('active')) {
                blogOverlay.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    showListView(); // Reset view when closed
                }, 400);
            }
            return;
        }

        if (hash === 'blog') {
            blogOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            showListView(); // Reset to list view first
            renderBlogList();
            return;
        }

        const post = blogData.find(p => p.slug === hash);
        if (post) {
            blogOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            renderBlogList(); // Ensure blog list is rendered for back navigation
            openArticle(post);
        }
    }

    // Defer hash check until preloader is done
    // This prevents the blog overlay from opening over a hidden appContent
    function deferredCheckHash() {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            // Preloader still active, wait for it to finish
            window.addEventListener('preloaderDone', () => checkHash(), { once: true });
        } else {
            // Preloader already done, check immediately
            checkHash();
        }
    }

    deferredCheckHash();

    // Listen for hash changes (e.g. browser back button)
    window.addEventListener('hashchange', checkHash);


    function renderBlogList() {
        console.log("Rendering Blog List...");
        if (!blogList) {
            console.error("Blog List container not found!");
            return;
        }
        blogList.innerHTML = '';
        blogData.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blog-card-item';
            card.onclick = () => openArticle(post);

            card.innerHTML = `
                <div class="blog-card-meta">
                    <span class="blog-date"><i class="far fa-calendar-alt"></i> ${post.date}</span>
                    <span class="blog-tag">#${post.tag}</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <span class="read-more-link">Devamını Oku <i class="fas fa-arrow-right"></i></span>
            `;
            blogList.appendChild(card);
        });
    }

    function openArticle(post) {
        // Populate Data
        articleTitle.textContent = post.title;
        articleDate.textContent = post.date;
        articleTag.textContent = `#${post.tag}`;
        articleContent.innerHTML = post.content;

        // Switch Views
        blogList.classList.add('hidden');
        blogList.style.display = 'none';

        blogDetail.classList.remove('hidden');
        blogDetail.classList.add('active');

        // Scroll to top of container
        document.querySelector('.blog-overlay').scrollTop = 0;

        // Update URL
        history.pushState(null, null, `#${post.slug}`);

        // Render Share Buttons
        renderShareButtons(post);
    }

    function renderShareButtons(post) {
        const shareContainer = document.getElementById('shareButtons');
        const currentUrl = window.location.href;
        const text = `"${post.title}" yazısını incele:`;

        // Social Links
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + currentUrl)}`;

        shareContainer.innerHTML = `
            <a href="${twitterUrl}" target="_blank" class="share-btn btn-twitter">
                <i class="fab fa-x-twitter"></i> X (Twitter)
            </a>
            <a href="${linkedinUrl}" target="_blank" class="share-btn btn-linkedin">
                <i class="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="${whatsappUrl}" target="_blank" class="share-btn btn-whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <button class="share-btn btn-copy" id="copyLinkBtn">
                <i class="fas fa-link"></i> Linki Kopyala
            </button>
        `;

        // Copy Link Logic
        document.getElementById('copyLinkBtn').addEventListener('click', function () {
            navigator.clipboard.writeText(currentUrl).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                this.style.borderColor = 'var(--accent-emerald)';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.borderColor = '';
                }, 2000);
            });
        });
    }

    function showListView() {
        blogDetail.classList.remove('active');
        blogDetail.classList.add('hidden');

        blogList.style.display = 'block';
        blogList.classList.remove('hidden');
    }
}
