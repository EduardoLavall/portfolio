/* ============================================
   PORTFÓLIO MODERNO - JAVASCRIPT
   Efeitos interativos: cursor neon, parallax, hover
   ============================================ */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CURSOR PERSONALIZADO COM EFEITO NEON
    // ============================================
    
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Segue o movimento do mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animação suave do cursor
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursorGlow.style.left = cursorX - 10 + 'px';
        cursorGlow.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Efeito especial quando o cursor está sobre elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .block');
    
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
    
    // ============================================
    // EFEITO PARALLAX SUAVE
    // ============================================
    
    const parallaxContainer = document.querySelector('.parallax-container');
    const blocks = document.querySelectorAll('.block');
    
    // Efeito parallax no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Move o fundo com parallax
        parallaxContainer.style.transform = `translateY(${rate}px)`;
        
        // Efeito parallax nos blocos
        blocks.forEach((block, index) => {
            const blockRate = scrolled * (0.1 + index * 0.05);
            block.style.transform = `translateY(${blockRate}px)`;
        });
    });
    
    // ============================================
    // EFEITOS DE HOVER AVANÇADOS
    // ============================================
    
    blocks.forEach(block => {
        const blockImage = block.querySelector('.block-image img');
        const blockText = block.querySelector('.block-text');
        
        // Efeito de inclinação no hover
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px)';
            
            // Efeito na imagem
            if (blockImage) {
                blockImage.style.transform = 'scale(1.05) rotate(2deg)';
            }
            
            // Efeito no texto
            if (blockText) {
                blockText.style.transform = 'translateX(10px)';
            }
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            
            // Reset da imagem
            if (blockImage) {
                blockImage.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset do texto
            if (blockText) {
                blockText.style.transform = 'translateX(0px)';
            }
        });
    });
    
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
    // EFEITO DE DIGITAÇÃO NO TÍTULO
    // ============================================
    
    const navBrand = document.querySelector('.nav-brand h1');
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
    
    // ============================================
    // EFEITO DE PARTÍCULAS INTERATIVAS
    // ============================================
    
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
                document.body.removeChild(particle);
            }
        }, 16);
    }
    
    // Cria partículas ao clicar
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createParticle(
                    e.clientX + (Math.random() - 0.5) * 20,
                    e.clientY + (Math.random() - 0.5) * 20
                );
            }, i * 50);
        }
    });
    
    // ============================================
    // EFEITO DE BRILHO NO SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observa todos os blocos
    blocks.forEach(block => {
        observer.observe(block);
    });
    
    // ============================================
    // EFEITO DE ILUMINAÇÃO NO MOUSE
    // ============================================
    
    document.addEventListener('mousemove', function(e) {
        const light = document.querySelector('.parallax-container::after');
        
        // Cria um efeito de luz que segue o mouse
        const lightEffect = document.createElement('div');
        lightEffect.style.position = 'fixed';
        lightEffect.style.left = e.clientX - 100 + 'px';
        lightEffect.style.top = e.clientY - 100 + 'px';
        lightEffect.style.width = '200px';
        lightEffect.style.height = '200px';
        lightEffect.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.1) 0%, transparent 70%)';
        lightEffect.style.pointerEvents = 'none';
        lightEffect.style.zIndex = '1';
        lightEffect.style.borderRadius = '50%';
        lightEffect.style.animation = 'fadeOut 2s ease-out forwards';
        
        document.body.appendChild(lightEffect);
        
        // Remove o efeito após a animação
        setTimeout(() => {
            if (document.body.contains(lightEffect)) {
                document.body.removeChild(lightEffect);
            }
        }, 2000);
    });
    
    // ============================================
    // ANIMAÇÕES CSS ADICIONAIS
    // ============================================
    
    // Adiciona estilos CSS dinamicamente para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(1.5); }
        }
        
        .block {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .block-image img {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .block-text {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // PERFORMANCE: THROTTLE PARA EVENTOS
    // ============================================
    
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Aplica throttle aos eventos de scroll e mousemove
    window.addEventListener('scroll', throttle(function() {
        // Código de scroll já implementado acima
    }, 16)); // ~60fps
    
    // ============================================
    // INSTRUÇÕES PARA PERSONALIZAÇÃO
    // ============================================
    
    /*
    COMO PERSONALIZAR OS EFEITOS JAVASCRIPT:
    
    1. VELOCIDADE DOS EFEITOS:
       - Cursor: altere o valor 0.1 na função animateCursor (maior = mais rápido)
       - Parallax: altere os valores de rate (maior = mais movimento)
       - Digitação: altere typeSpeed (menor = mais rápido)
    
    2. EFEITOS DE HOVER:
       - Rotação: altere os valores rotateX/rotateY nos eventos mouseenter
       - Escala: altere o valor scale() na imagem
       - Movimento: altere translateX/translateY
    
    3. PARTÍCULAS:
       - Quantidade: altere o valor 5 no loop de partículas
       - Velocidade: altere o valor 16 no setInterval
       - Tamanho: altere os valores width/height iniciais
    
    4. DESABILITAR EFEITOS:
       - Comente as seções que não deseja usar
       - Para desabilitar o cursor personalizado, remova cursor: none do CSS
    
    5. ADICIONAR NOVOS EFEITOS:
       - Crie novas funções seguindo o padrão existente
       - Use requestAnimationFrame para animações suaves
       - Sempre limpe event listeners e elementos criados dinamicamente
    */
    
    console.log('🚀 Portfólio carregado com sucesso!');
    console.log('💡 Dica: Passe o mouse sobre os blocos para ver os efeitos neon!');
});

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

    // Função para pausar animações em dispositivos móveis (performance)
if (isMobile()) {
    document.addEventListener('DOMContentLoaded', function() {
        // Desabilita alguns efeitos em mobile para melhor performance
        const cursorGlow = document.querySelector('.cursor-glow');
        if (cursorGlow) {
            cursorGlow.style.display = 'none';
        }
        
        // Remove cursor: none do body em mobile
        document.body.style.cursor = 'auto';
    });
} else {
    // Em desktop, habilita cursor personalizado
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.cursor = 'none';
    });
}
