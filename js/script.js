// Auto-scroll to section on page load if hash exists
window.addEventListener('load', () => {
 if (window.location.hash) {
 const element = document.querySelector(window.location.hash);
 if (element) {
 setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
 }
 }
});

// Generate gallery items dynamically
const galleryContainer = document.getElementById('galleryContainer');
if (galleryContainer) {
 for (let i = 1; i <= 100; i++) {
 const item = document.createElement('div');
 item.className = 'item';
 const img = document.createElement('img');
 img.src = `images/image${i}.jpg`;
 img.alt = 'Décor gâteau';
 img.loading = 'lazy';
 item.appendChild(img);
 galleryContainer.appendChild(item);
 }
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav ul li a');
if (menuToggle && nav) {
 menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
 navLinks.forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const closeLightbox = () => {
 if (!lightbox) return;
 lightbox.classList.remove('open');
 lightbox.setAttribute('aria-hidden', 'true');
 if (lightboxImage) lightboxImage.src = '';
};

document.querySelectorAll('.item img').forEach(img => {
 img.addEventListener('click', () => {
 if (!lightbox || !lightboxImage) return;
 lightboxImage.src = img.src;
 lightboxImage.alt = img.alt || '';
 lightbox.classList.add('open');
 lightbox.setAttribute('aria-hidden', 'false');
 });
});

if (lightboxClose) {
 lightboxClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
 lightbox.addEventListener('click', (event) => {
 if (event.target === lightbox) closeLightbox();
 });
}

document.addEventListener('keydown', (event) => {
 if (event.key === 'Escape') closeLightbox();
});
