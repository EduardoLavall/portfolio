/* JavaScript Simplificado para o Portfólio */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfólio carregado!');
    
    // ============================================
    // CURSOR PERSONALIZADO
    // ============================================
    
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    
    if (cursorGlow) {
        // Segue o movimento do mouse
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.style.left = mouseX - 10 + 'px';
            cursorGlow.style.top = mouseY - 10 + 'px';
        });
        
        // Efeito especial quando o cursor está sobre elementos clicáveis
        const clickableElements = document.querySelectorAll('a, .block');
        
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorGlow.style.transform = 'scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle, #FF3333 0%, transparent 70%)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorGlow.style.transform = 'scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, #FF0000 0%, transparent 70%)';
            });
        });
    }
    
    // ============================================
    // NAVEGAÇÃO SUAVE
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // EFEITOS DE HOVER NOS BLOCOS
    // ============================================
    
    const blocks = document.querySelectorAll('.block');
    
    blocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            console.log('Hover no bloco!');
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // EFEITO DE DIGITAÇÃO NO TÍTULO
    // ============================================
    
    const navBrand = document.querySelector('.nav-brand h1');
    if (navBrand) {
        const originalText = navBrand.textContent;
        let currentIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            if (isDeleting) {
                navBrand.textContent = originalText.substring(0, currentIndex - 1);
                currentIndex--;
            } else {
                navBrand.textContent = originalText.substring(0, currentIndex + 1);
                currentIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentIndex === originalText.length) {
                typeSpeed = 2000; // Pausa no final
                isDeleting = true;
            } else if (isDeleting && currentIndex === 0) {
                isDeleting = false;
                typeSpeed = 500; // Pausa no início
            }
            
            setTimeout(typeWriter, typeSpeed);
        }
        
        // Inicia o efeito de digitação após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // ============================================
    // EFEITO DE PARTÍCULAS NO CLIQUE
    // ============================================
    
    document.addEventListener('click', function(e) {
        // Cria partículas ao clicar
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createParticle(
                    e.clientX + (Math.random() - 0.5) * 20,
                    e.clientY + (Math.random() - 0.5) * 20
                );
            }, i * 50);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#FF0000';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 10px #FF0000';
        
        document.body.appendChild(particle);
        
        // Animação da partícula
        let opacity = 1;
        let size = 4;
        const animation = setInterval(() => {
            opacity -= 0.02;
            size += 0.5;
            particle.style.opacity = opacity;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            if (opacity <= 0) {
                clearInterval(animation);
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }
        }, 16);
    }
    
    // ============================================
    // DETECÇÃO DE DISPOSITIVOS MÓVEIS
    // ============================================
    
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    if (isMobile()) {
        // Desabilita cursor personalizado em mobile
        if (cursorGlow) {
            cursorGlow.style.display = 'none';
        }
        document.body.style.cursor = 'auto';
    } else {
        // Habilita cursor personalizado em desktop
        document.body.style.cursor = 'none';
    }
    
    console.log('✅ Todos os efeitos carregados com sucesso!');
});
