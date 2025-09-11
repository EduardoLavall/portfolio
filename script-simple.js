window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
    // Elementos da Animação
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const contactInfo = document.querySelector('.contact-info');
    const heroImage = document.querySelector('.hero-image');
    const heroLinks = document.querySelectorAll('.hero-link');
    const scrollDownMessage = document.querySelector('.scroll-down-message');

    // Elementos do Script Original
    const headerFixed = document.getElementById('header-fixed');
    const navLinks = document.querySelectorAll('.nav-link');
    const blocks = document.querySelectorAll('.block');
    const cursorGlow = document.querySelector('.cursor-glow');

    // Função de Animação de Digitação
    function typeEffect(element, text, duration, callback) {
        element.textContent = '';
        element.style.opacity = '1';
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                if (callback) callback();
            }
        }, duration / text.length);
    }

    // Animação dos Links
    function animateLinks() {
        let delay = 0;
        heroLinks.forEach(link => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.classList.add('scale-up');
            }, delay);
            delay += 150;
        });
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            // Ativa o comportamento do header após a animação
            window.addEventListener('scroll', debouncedHandleScroll);
            // Mostra a mensagem de scroll
            scrollDownMessage.style.opacity = '1';
            scrollDownMessage.style.pointerEvents = 'auto';
        }, delay);
    }

    // Sequência da Animação Principal
    function startAnimation() {
        document.body.style.overflow = 'hidden';
        scrollDownMessage.style.opacity = '0';
        scrollDownMessage.style.pointerEvents = 'none';

        const titleText = heroTitle.textContent;
        const subtitleText = heroSubtitle.textContent;
        const descriptionText = heroDescription.textContent;
        heroTitle.textContent = '';
        heroSubtitle.textContent = '';
        heroDescription.textContent = '';

        setTimeout(() => {
            typeEffect(heroTitle, titleText, 500, () => {
                setTimeout(() => {
                    typeEffect(heroSubtitle, subtitleText, 250, () => {
                        setTimeout(() => {
                            typeEffect(heroDescription, descriptionText, 1, () => {
                                setTimeout(() => {
                                    contactInfo.style.opacity = '1';
                                    contactInfo.classList.add('fade-in');
                                    setTimeout(() => {
                                        heroImage.style.opacity = '1';
                                        heroImage.classList.add('scale-up');
                                        setTimeout(() => animateLinks(), 250);
                                    }, 250);
                                }, 500);
                            });
                        }, 500);
                    });
                }, 500);
            });
        }, 500);
    }

    // Funções do Script Original
    function handleScroll() {
        const scrollY = window.scrollY;
        const heroSection = document.getElementById('sobre');
        const heroHeight = heroSection.offsetHeight;
        if (scrollY > heroHeight * 0.3) {
            headerFixed.classList.add('visible');
        } else {
            headerFixed.classList.remove('visible');
        }
        updateActiveSection();
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        let currentSection = '';
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop - 200) {
                currentSection = sectionId;
                break;
            }
        }
        if (!currentSection) {
            currentSection = 'sobre';
        }
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Mostra ou esconde a mensagem de scroll
        if (currentSection === 'sobre') {
            scrollDownMessage.style.opacity = '1';
            scrollDownMessage.style.pointerEvents = 'auto';
        } else {
            scrollDownMessage.style.opacity = '0';
            scrollDownMessage.style.pointerEvents = 'none';
        }
    }

    let scrollTimeout;
    function debouncedHandleScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    }

    updateActiveSection();
    handleScroll(); // Chama a função para o estado inicial

    

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    blocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    blocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(block);
    });

    // Inicia a Animação
    startAnimation();
});