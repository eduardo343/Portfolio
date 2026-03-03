class RetroPortfolio {
    constructor() {
        this.currentProject = 0;
        this.totalProjects = 6;
        this.projects = document.querySelectorAll('.project');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressFill = document.querySelector('.progress-fill');
        this.currentPageDisplay = document.querySelector('.current-page');
        
        this.init();
        this.createStars();
        this.bindEvents();
        this.updateDisplay();
    }
    
    init() {
        // Inicializar estado
        this.showProject(0);
        this.updateButtons();
        
        // Precargar efectos de sonido (opcional)
        this.setupAudio();
    }
    
    setupAudio() {
        // Crear contexto de audio para efectos de sonido (opcional)
        try {
            const legacyWindow = /** @type {Window & { webkitAudioContext?: typeof AudioContext }} */ (window);
            const AudioContextCtor = window.AudioContext || legacyWindow.webkitAudioContext;
            if (AudioContextCtor) {
                this.audioContext = new AudioContextCtor();
            }
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    createStars() {
        const starsContainer = document.querySelector('.stars-container');
        
        // Crear múltiples estrellas dinámicamente
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: var(--neon-yellow);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 1}s infinite alternate;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 6px var(--neon-yellow);
            `;
            starsContainer.appendChild(star);
        }
    }
    
    bindEvents() {
        // Navegación con botones
        this.prevBtn.addEventListener('click', () => this.navigateProject(-1));
        this.nextBtn.addEventListener('click', () => this.navigateProject(1));
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    this.navigateProject(-1);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    this.navigateProject(1);
                    break;
            }
        });
        
        // Efectos de hover en botones
        [this.prevBtn, this.nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => this.playHoverEffect());
            btn.addEventListener('click', () => this.playClickEffect(btn));
        });
        
        // Efectos táctiles en móvil
        this.setupTouchEvents();
        
        // Auto-actualizar estrellas
        this.animateStars();
    }
    
    setupTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const screen = document.querySelector('.screen');
        
        screen.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        screen.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next project
                    this.navigateProject(1);
                } else {
                    // Swipe right - previous project
                    this.navigateProject(-1);
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    navigateProject(direction) {
        const newIndex = this.currentProject + direction;
        
        if (newIndex >= 0 && newIndex < this.totalProjects) {
            this.showProject(newIndex);
            this.vibrateDevice();
        }
    }
    
    showProject(index) {
        // Ocultar proyecto actual
        if (this.projects[this.currentProject]) {
            this.projects[this.currentProject].classList.remove('active');
        }
        
        // Actualizar índice
        this.currentProject = index;
        
        // Mostrar nuevo proyecto con transición
        setTimeout(() => {
            this.projects[this.currentProject].classList.add('active');
        }, 150);
        
        this.updateDisplay();
        this.updateButtons();
        this.triggerScreenEffect();
    }
    
    updateDisplay() {
        // Actualizar display digital
        this.currentPageDisplay.textContent = (this.currentProject + 1).toString().padStart(2, '0');
        
        // Actualizar barra de progreso
        const progressPercentage = ((this.currentProject + 1) / this.totalProjects) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
    }
    
    updateButtons() {
        // Deshabilitar botones en los extremos
        this.prevBtn.disabled = this.currentProject === 0;
        this.nextBtn.disabled = this.currentProject === this.totalProjects - 1;
    }
    
    triggerScreenEffect() {
        // Efecto de cambio de pantalla rápido
        const screen = document.querySelector('.screen');
        screen.style.filter = 'brightness(1.5) contrast(1.2)';
        
        setTimeout(() => {
            screen.style.filter = 'brightness(1) contrast(1)';
        }, 100);
    }
    
    playHoverEffect() {
        // Efecto visual para hover
        if (this.audioContext) {
            this.createTone(800, 0.1, 0.05);
        }
    }
    
    playClickEffect(button) {
        // Efecto visual y sonoro para click
        button.style.transform = 'translateY(2px) scale(0.95)';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        if (this.audioContext) {
            this.createTone(400, 0.2, 0.1);
        }
        
        this.vibrateDevice();
    }
    
    createTone(frequency, duration, volume = 0.1) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'square'; // Sonido 8-bit
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    vibrateDevice() {
        // Vibración en dispositivos móviles
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    animateStars() {
        // Añadir más estrellas dinámicamente
        setInterval(() => {
            this.addRandomStar();
        }, 3000);
    }
    
    addRandomStar() {
        const starsContainer = document.querySelector('.stars-container');
        const existingStars = starsContainer.querySelectorAll('.star');
        
        // Limitar número de estrellas
        if (existingStars.length > 20) {
            existingStars[0].remove();
        }
        
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: var(--neon-yellow);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 4 + 1}s infinite alternate;
            animation-delay: ${Math.random() * 2}s;
            box-shadow: 0 0 8px var(--neon-yellow);
            opacity: 0;
        `;
        
        starsContainer.appendChild(star);
        
        // Fade in
        setTimeout(() => {
            star.style.opacity = '1';
        }, 100);
        
        // Remove after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, 8000);
    }
    
    // Método para añadir proyectos dinámicamente
    addProject(projectData) {
        const projectsContainer = document.querySelector('.projects-container');
        const projectElement = this.createProjectElement(projectData);
        projectsContainer.appendChild(projectElement);
        
        this.projects = document.querySelectorAll('.project');
        this.totalProjects = this.projects.length;
        
        // Actualizar display total
        document.querySelector('.total-pages').textContent = 
            this.totalProjects.toString().padStart(2, '0');
    }
    
    createProjectElement(data) {
        const project = document.createElement('div');
        project.className = 'project';
        project.setAttribute('data-level', data.level);
        
        project.innerHTML = `
            <div class="project-header">
                <span class="level-indicator">LVL ${data.level.toString().padStart(2, '0')}</span>
                <div class="project-sprite">${data.sprite}</div>
            </div>
            <div class="dialog-box">
                <div class="dialog-header">
                    <span class="project-title">${data.title}</span>
                </div>
                <div class="dialog-content">
                    <p>${data.description}</p>
                    <div class="tech-badges">
                        ${data.technologies.map(tech => 
                            `<span class="badge ${tech.class}">${tech.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        
        return project;
    }
    
    // Efecto matrix/glitch ocasional
    triggerGlitchEffect() {
        const title = document.querySelector('.glitch-title');
        title.classList.add('intense-glitch');
        
        setTimeout(() => {
            title.classList.remove('intense-glitch');
        }, 1000);
    }
}

// Efectos adicionales CSS dinámicos
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .intense-glitch {
            animation: intense-glitch 0.3s infinite !important;
        }
        
        @keyframes intense-glitch {
            0% { transform: translate(0); filter: hue-rotate(0deg); }
            10% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
            20% { transform: translate(-5px, -5px); filter: hue-rotate(180deg); }
            30% { transform: translate(5px, 5px); filter: hue-rotate(270deg); }
            40% { transform: translate(5px, -5px); filter: hue-rotate(360deg); }
            50% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
            60% { transform: translate(-5px, -5px); filter: hue-rotate(180deg); }
            70% { transform: translate(5px, 5px); filter: hue-rotate(270deg); }
            80% { transform: translate(5px, -5px); filter: hue-rotate(360deg); }
            90% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
            100% { transform: translate(0); filter: hue-rotate(0deg); }
        }
        
        .star {
            transition: all 0.3s ease;
        }
        
        .nav-btn {
            user-select: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    const portfolio = new RetroPortfolio();
    
    // Trigger glitch effect ocasionalmente
    setInterval(() => {
        if (Math.random() < 0.3) {
            portfolio.triggerGlitchEffect();
        }
    }, 10000);
    
    // Easter egg: Konami Code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            
            // Easter egg activado
            document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
            portfolio.triggerGlitchEffect();
            
            if (portfolio.audioContext) {
                // Tono especial
                portfolio.createTone(1000, 0.5, 0.3);
                setTimeout(() => portfolio.createTone(1200, 0.5, 0.3), 200);
            }
            
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            
            konamiCode = [];
        }
    });
    
    // Exponer portfolio globalmente para debugging
    window.portfolio = portfolio;
});

// Prevenir zoom en mobile
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
