const galleryItems = [...document.querySelectorAll('.gallery-item')];
const filterButtons = [...document.querySelectorAll('.filters button')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const caption = document.querySelector('.caption');
const closeButton = document.querySelector('.close');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let visibleItems = galleryItems;
let currentIndex = 0;

function updateVisibleItems(filter) {
    galleryItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hide', !matches);
    });

    visibleItems = galleryItems.filter(item => !item.classList.contains('hide'));
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        updateVisibleItems(button.dataset.filter);
    });
});

function showImage(index) {
    if (!visibleItems.length) return;

    currentIndex = (index + visibleItems.length) % visibleItems.length;

    const item = visibleItems[currentIndex];
    const image = item.querySelector('img');

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    caption.textContent = item.dataset.title || image.alt;
}

function openLightbox(item) {
    visibleItems = galleryItems.filter(element => !element.classList.contains('hide'));
    currentIndex = visibleItems.indexOf(item);

    showImage(currentIndex);
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
}

function closeLightbox() {
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
});

prevButton.addEventListener('click', () => showImage(currentIndex - 1));
nextButton.addEventListener('click', () => showImage(currentIndex + 1));
closeButton.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('show')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});
