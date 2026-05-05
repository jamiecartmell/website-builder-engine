// Nav scroll shadow (already white so just keep as-is)
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 2px 24px rgba(13,43,107,0.12)'
      : '0 1px 0 #D0DAEA';
  }, { passive: true });
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (links) {
      const open = links.style.display === 'flex';
      links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:76px;left:0;right:0;background:white;padding:16px 24px;border-bottom:1px solid #D0DAEA;gap:4px;z-index:300;';
    }
  });
}
