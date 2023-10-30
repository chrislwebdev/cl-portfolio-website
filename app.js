
const navBtn = document.querySelector('.nav-buttons-container')
const navOpen = document.querySelector('.nav-open-btn');
const navClose = document.querySelector('.nav-close-btn')
const navbar = document.querySelector('.hero-navbar');

navBtn.addEventListener('click', () => {
    navClose.classList.toggle('visible');
    navOpen.classList.toggle('invisible');
    navbar.classList.toggle('visible')
})