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
const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
const lightboxNext = lightbox?.querySelector('.lightbox-next');
let currentImageIndex = 0;
let allImages = [];
let touchStartX = 0;
let touchEndX = 0;

const closeLightbox = () => {
 if (!lightbox) return;
 lightbox.classList.remove('open');
 lightbox.setAttribute('aria-hidden', 'true');
 if (lightboxImage) lightboxImage.src = '';
};

const showImage = (index, direction = 'next') => {
 if (index < 0) index = allImages.length - 1;
 if (index >= allImages.length) index = 0;
 currentImageIndex = index;
 if (lightboxImage) {
 // Remove previous animation classes
 lightboxImage.classList.remove('slide-in-next', 'slide-in-prev');
 // Force reflow to restart animation
 void lightboxImage.offsetWidth;
 // Update image source
 lightboxImage.src = allImages[index].src;
 lightboxImage.alt = allImages[index].alt || '';
 // Add appropriate animation class
 lightboxImage.classList.add(direction === 'next' ? 'slide-in-next' : 'slide-in-prev');
 }
};

const nextImage = () => showImage(currentImageIndex + 1, 'next');
const prevImage = () => showImage(currentImageIndex - 1, 'prev');

const handleSwipe = () => {
 const swipeThreshold = 50;
 const diff = touchStartX - touchEndX;
 const isRTL = document.body.dir === 'rtl';
 
 if (Math.abs(diff) > swipeThreshold) {
 if (isRTL) {
 // In RTL: swipe left = previous, swipe right = next
 if (diff > 0) prevImage();
 else nextImage();
 } else {
 // In LTR: swipe right = previous, swipe left = next
 if (diff > 0) nextImage();
 else prevImage();
 }
 }
};

document.querySelectorAll('.item img').forEach((img, index) => {
 allImages.push({ src: img.src, alt: img.alt });
 img.addEventListener('click', () => {
 if (!lightbox || !lightboxImage) return;
 currentImageIndex = index;
 lightboxImage.src = img.src;
 lightboxImage.alt = img.alt || '';
 lightbox.classList.add('open');
 lightbox.setAttribute('aria-hidden', 'false');
 });
});

if (lightboxClose) {
 lightboxClose.addEventListener('click', closeLightbox);
}
if (lightboxPrev) {
 lightboxPrev.addEventListener('click', prevImage);
}
if (lightboxNext) {
 lightboxNext.addEventListener('click', nextImage);
}
if (lightbox) {
 lightbox.addEventListener('click', (event) => {
 if (event.target === lightbox) closeLightbox();
 });
 lightbox.addEventListener('touchstart', (event) => {
 touchStartX = event.changedTouches[0].screenX;
 }, false);
 lightbox.addEventListener('touchend', (event) => {
 touchEndX = event.changedTouches[0].screenX;
 handleSwipe();
 }, false);
}

document.addEventListener('keydown', (event) => {
 if (event.key === 'Escape') closeLightbox();
 if (event.key === 'ArrowLeft') {
 const isRTL = document.body.dir === 'rtl';
 isRTL ? nextImage() : prevImage();
 }
 if (event.key === 'ArrowRight') {
 const isRTL = document.body.dir === 'rtl';
 isRTL ? prevImage() : nextImage();
 }
});
