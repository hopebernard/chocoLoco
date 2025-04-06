"use strict"



const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
    lazyImages.forEach(img => {
        if (img.dataset.src || img.dataset.srcset) {
            lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
            lazyScrollCheck();
        }
    });
}

window.addEventListener('scroll', lazyScroll);

function lazyScroll() {
    if (document.querySelectorAll('img[data-src],source[data-srcset]').length > 0) {
        lazyScrollCheck();
    }
}

function lazyScrollCheck() {
    let imgIndex = lazyImagesPositions.findIndex(
        item => pageYOffset > item - windowHeight
    );
    if (imgIndex >= 0) {
        if (lazyImages[imgIndex].dataset.src) {
            lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
            lazyImages[imgIndex].removeAttribute('data-src');
        } else if (lazyImages[imgIndex].dataset.srcset) {
            lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
            lazyImages[imgIndex].removeAttribute('data-srcset');
        }
        delete lazyImagesPositions[imgIndex];
    }
}






const burgerIcon = document.querySelector('.icon-menu');
const burgerMenu = document.querySelector('.menu');

burgerIcon.addEventListener('click', function() {
    burgerIcon.classList.toggle('_burger-icon-active');
    burgerMenu.classList.toggle('_burger-menu-active');
})







/*====================================
======================================
======================================
======================================
======================================
======================================
======================================*/


function bildSliders() {
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if (sliders) {
        sliders.forEach(slider => {
            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for (const slide of slider.children) {
                slide.classList.add('swiper-slide');
            }
        });
    }
}

function initSliders() {
    bildSliders();
    if (document.querySelector('.show__slider')) {
        new Swiper('.show__slider', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            loop: true,
            observer: true,
            spaceBetween: 10,
            breakpoints: {
                300: {
                    slidesPerView: 1,
                },
                750: {
                    slidesPerView: 2,
                },
                990: {
                    slidesPerView: 3,
                },
                1590: {
                    slidesPerView: 4,
                    autoHeight: true,
                },
            }
        });
    }
};

window.addEventListener('load', function(e) {
    initSliders();
});
window.addEventListener('resize', function(e) {
    initSliders();
});