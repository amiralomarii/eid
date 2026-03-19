/* ========================================
   Premium Eid Gift Website - JavaScript
   ======================================== */

// DOM Elements
const eidiyaBtn = document.getElementById('eidiyaBtn');
const giftReveal = document.getElementById('giftReveal');
const giftAmount = document.getElementById('giftAmount');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn');
const confettiContainer = document.getElementById('confetti');
const particlesContainer = document.getElementById('particles');
const heroSection = document.querySelector('.hero');

// Gift Options with Weights
const gifts = [
    { text: '🪙 عيديتك: ربع دينار', weight: 1, image: 'Money/1-4 dinar.jpg' },
    { text: '🪙 عيديتك: نصف دينار', weight: 4, image: 'Money/1-2 dinar.jpg' },
    { text: '💵 عيديتك: دينار واحد', weight: 5, image: 'Money/1 dinar.jpg' },
    { text: '💵 عيديتك: 5 دنانير', weight: 40, image: 'Money/5 dinar.jpg' },
    { text: '💵 عيديتك: 10 دنانير', weight: 35, image: 'Money/10 dinar.jpg' },
    { text: '💰 عيديتك: 20 دينار', weight: 15, image: 'Money/20 dinar.jpg' }
];

let tryCount = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initializeAnimations();
});

// Create Background Particles
function createParticles() {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }
}

// Initialize Animations
function initializeAnimations() {
    // Add entrance animations delay
    const elements = document.querySelectorAll('.hero > *');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

// Weighted Random Selection
function getRandomGift() {
    const totalWeight = gifts.reduce((sum, gift) => sum + gift.weight, 0);
    let random = Math.random() * totalWeight;

    for (const gift of gifts) {
        if (random < gift.weight) {
            return gift;
        }
        random -= gift.weight;
    }

    return gifts[0];
}

// Create Confetti
function createConfetti() {
    const colors = ['#d4af37', '#f4d03f', '#ffffff', '#2d5a3d', '#ff6b6b', '#4ecdc4'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`;

        // Random shapes
        const shapes = ['50%', '0%', '3px'];
        confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Random sizes
        const size = 5 + Math.random() * 10;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Create Sparkles in Gift Card
function createSparkles() {
    const sparklesContainer = document.querySelector('.gift-sparkles');
    if (!sparklesContainer) return;

    sparklesContainer.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 1.5s ease-in-out infinite;
            animation-delay: ${Math.random() * 1.5}s;
            box-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37;
        `;
        sparklesContainer.appendChild(sparkle);
    }

    // Add sparkle keyframes if not exists
    if (!document.querySelector('#sparkle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'sparkle-keyframes';
        style.textContent = `
            @keyframes sparkle {
                0%, 100% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Reveal Gift Animation
function revealGift() {
    const selectedGift = getRandomGift();

    // Hide hero section
    heroSection.style.display = 'none';

    // Update gift content
    const giftIconContainer = document.querySelector('.gift-icon');
    giftIconContainer.innerHTML = `<img src="${selectedGift.image}" alt="عيدية" class="gift-image">`;
    giftAmount.textContent = selectedGift.text;

    // Show gift reveal section
    giftReveal.classList.remove('hidden');

    // Create effects
    createConfetti();
    createSparkles();

    // Add celebration effects
    addCelebrationEffects();
}

// Add Celebration Effects
function addCelebrationEffects() {
    // Screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
        pointer-events: none;
        z-index: 999;
        animation: flashFade 0.5s ease-out forwards;
    `;
    document.body.appendChild(flash);

    // Add flash animation
    if (!document.querySelector('#flash-keyframes')) {
        const style = document.createElement('style');
        style.id = 'flash-keyframes';
        style.textContent = `
            @keyframes flashFade {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => flash.remove(), 500);
}

// Play Coin Sound
function playCoinSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        
        // Classic pleasant coin sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        // Frequencies for a bright chime
        osc1.frequency.setValueAtTime(988, ctx.currentTime);  // B5
        osc2.frequency.setValueAtTime(1318, ctx.currentTime); // E6
        
        osc1.type = "sine";
        osc2.type = "sine";
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc1.start(ctx.currentTime);
        osc2.start(ctx.currentTime);
        
        osc1.stop(ctx.currentTime + 0.5);
        osc2.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported', e);
    }
}

// Reset to Try Again
function resetGift() {
    tryCount++;
    // Add exit animation
    giftReveal.style.animation = 'revealOut 0.5s ease-in forwards';

    // Add exit animation keyframes
    if (!document.querySelector('#reveal-out-keyframes')) {
        const style = document.createElement('style');
        style.id = 'reveal-out-keyframes';
        style.textContent = `
            @keyframes revealOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        // Hide gift reveal
        giftReveal.classList.add('hidden');
        giftReveal.style.animation = '';

        // Show hero section
        heroSection.style.display = 'block';
        heroSection.style.animation = 'fadeInUp 0.8s ease-out';

        // Restore button state
        eidiyaBtn.disabled = false;
        eidiyaBtn.style.pointerEvents = 'auto';
        eidiyaBtn.innerHTML = `
            <span class="btn-text">اضغط لاستلام العيدية</span>
            <span class="btn-icon">💰</span>
            <div class="btn-glow"></div>
        `;

        // Clear sparkles
        const sparklesContainer = document.querySelector('.gift-sparkles');
        if (sparklesContainer) {
            sparklesContainer.innerHTML = '';
        }
    }, 500);
}



// Suspense Animation Before Reveal
function createSuspense(callback) {
    const button = eidiyaBtn;

    // Disable button
    button.disabled = true;
    button.style.pointerEvents = 'none';

    // Add suspense animation
    button.innerHTML = `
        <span class="btn-text">جاري الكشف...</span>
        <span class="btn-icon" style="animation: spin 1s linear infinite;">✨</span>
        <div class="btn-glow"></div>
    `;

    // Add spin animation
    if (!document.querySelector('#spin-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spin-keyframes';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Suspense duration
    setTimeout(callback, 1500);
}

// Event Listeners
eidiyaBtn.addEventListener('click', () => {
    playCoinSound();
    createSuspense(revealGift);
});

tryAgainBtn.addEventListener('click', resetGift);

whatsappShareBtn.addEventListener('click', () => {
    // 1. Get the current text
    const amountText = giftAmount.textContent;
    // Strip emojis and "عيديتك: " to get just the amount
    let cleanText = amountText.replace(/🪙|💵|💰/g, '').trim();
    cleanText = cleanText.replace('عيديتك:', '').trim();
    
    // 2. Prepare WhatsApp URL
    const phoneNumber = "96596085309";
    
    let text = `هلا امير , عيديتي : ${cleanText}`;
    if (tryCount === 2) {
        text += ` (بعد محاولتين)`;
    } else if (tryCount > 2 && tryCount <= 10) {
        text += ` (بعد ${tryCount} محاولات)`;
    } else if (tryCount > 10) {
        text += ` (بعد ${tryCount} محاولة)`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    // 3. Open in new tab
    window.open(whatsappUrl, '_blank');
});

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const factor = (index + 1) * 0.5;
        star.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });

    const crescentMoon = document.querySelector('.crescent-moon');
    if (crescentMoon) {
        crescentMoon.style.transform = `translate(${moveX * 2}px, ${moveY * 2}px)`;
    }
});

// Touch support for mobile
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    // Add subtle parallax on scroll
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const factor = (index + 1) * 0.1;
        star.style.transform = `translateY(${diff * factor}px)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.gift-card, .personal-message').forEach(el => {
    observer.observe(el);
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.eidiya-button, .try-again-button')) {
        e.preventDefault();
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;

    // Add ripple animation
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

eidiyaBtn.addEventListener('click', createRipple);
tryAgainBtn.addEventListener('click', createRipple);
whatsappShareBtn.addEventListener('click', createRipple);

// Console Easter Egg
console.log(`
%c🌙 عيد مبارك! 🌙
%cEid Mubarak!
%cMade with ❤️ by Amir Alomari
`,
'font-size: 24px; color: #d4af37;',
'font-size: 18px; color: #fff;',
'font-size: 14px; color: #888;'
);
