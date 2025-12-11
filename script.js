// ==================== VARIABLES GLOBALES ====================
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTop = document.querySelector('.scroll-top');
const scrollProgress = document.querySelector('.scroll-progress');

// ==================== MENÚ MÓVIL ====================
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMobile.classList.toggle('active');
  document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// ==================== SCROLL SPY ====================
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// ==================== SCROLL EFFECTS ====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  // Header con sombra al hacer scroll
  if (scrolled > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scroll to top button
  if (scrolled > 300) {
    scrollTop.classList.add('visible');
  } else {
    scrollTop.classList.remove('visible');
  }

  // Progress bar
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled_percent = (scrolled / windowHeight) * 100;
  scrollProgress.style.width = scrolled_percent + '%';

  // Update active link
  updateActiveLink();
});

// Scroll to top functionality
scrollTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    }
  }

  // Iniciar animación después de un pequeño delay
  setTimeout(typeWriter, 500);
}

// ==================== CANVAS PARTICLES ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const connectionDistance = 150;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 234, 255, 0.5)';
    ctx.fill();
  }
}

// Crear partículas
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Conectar partículas
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 234, 255, ${1 - distance / connectionDistance})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animar canvas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Redimensionar canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==================== PROYECTOS DESPLEGABLES ====================
const detailsToggles = document.querySelectorAll('.details-toggle');

detailsToggles.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.project-item');
    const details = item.querySelector('.project-details-new');
    
    button.classList.toggle('active');
    details.classList.toggle('active');
  });
});

// ==================== CLICK EN IMAGEN ABRE DEMO ====================
document.querySelectorAll('.project-image-container').forEach(container => {
  container.addEventListener('click', (e) => {
    const item = container.closest('.project-item');
    const demoLink = item.querySelector('.project-btn[title="Ver demo"]');
    if (demoLink) {
      window.open(demoLink.href, '_blank');
    }
  });
});

// ==================== EFECTO TILT 3D INTERACTIVO ====================
document.querySelectorAll('.project-item').forEach(card => {
  const container = card.querySelector('.project-image-container');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// ==================== SKELETON LOADING PARA IMÁGENES ====================
document.querySelectorAll('.project-image').forEach(img => {
  const container = img.closest('.project-image-container');
  
  // Agregar clase loading al contenedor
  container.classList.add('loading');
  
  // Cuando la imagen carga
  img.addEventListener('load', () => {
    container.classList.remove('loading');
  });
  
  // Si la imagen ya está cargada (cache)
  if (img.complete) {
    container.classList.remove('loading');
  }
  
  // Timeout de seguridad por si falla la carga
  setTimeout(() => {
    container.classList.remove('loading');
  }, 3000);
});

// ==================== ANIMACIÓN DE SKILLS BARS ====================
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ==================== ANIMACIONES AOS (Animate On Scroll) ====================
const observerOptionsAOS = {
  threshold: 0.2,
  rootMargin: '0px'
};

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptionsAOS);

document.querySelectorAll('[data-aos]').forEach(element => {
  aosObserver.observe(element);
});

// ==================== INTERACCIÓN CON EL MOUSE EN CARDS ====================
document.querySelectorAll('.project-card, .skill-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ==================== PRELOADER (Opcional) ====================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ==================== CURSOR PERSONALIZADO (Opcional - avanzado) ====================
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

let cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animación suave del cursor
function animateCursor() {
  // Cursor principal (más rápido)
  cursorX += (mouseX - cursorX) * 0.2;
  cursorY += (mouseY - cursorY) * 0.2;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  // Cursor follower (más lento)
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Efectos hover en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

// ==================== EASTER EGG - KONAMI CODE ====================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  // Crear confetti
  for (let i = 0; i < 100; i++) {
    createConfetti();
  }
  
  // Mensaje especial
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 234, 255, 0.9);
    color: #0d0d0d;
    padding: 30px 50px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    z-index: 10000;
    animation: fadeInOut 3s ease;
  `;
  message.textContent = '🎉 ¡Código secreto activado! 🎉';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 3000);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: ${['#00eaff', '#0099ff', '#ff0055', '#ffdd00'][Math.floor(Math.random() * 4)]};
    top: -10px;
    left: ${Math.random() * 100}vw;
    opacity: 1;
    z-index: 9999;
    animation: fall ${Math.random() * 3 + 2}s linear;
  `;
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  
  .custom-cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: width 0.3s, height 0.3s;
  }
  
  .cursor-follower {
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
  }
  
  .custom-cursor.hover {
    width: 20px;
    height: 20px;
  }
  
  .cursor-follower.hover {
    width: 50px;
    height: 50px;
  }
  
  @media (max-width: 768px) {
    .custom-cursor,
    .cursor-follower {
      display: none;
    }
  }
`;
document.head.appendChild(style);

// ==================== LOG INICIAL ====================
console.log('%c¡Hola, desarrollador curioso! 👋', 'color: #00eaff; font-size: 20px; font-weight: bold;');
console.log('%c¿Te gusta el código? Visita mi GitHub 🚀', 'color: #0099ff; font-size: 14px;');
console.log('%cTip: Prueba el código Konami (↑ ↑ ↓ ↓ ← → ← → B A)', 'color: #b3b3b3; font-size: 12px;');