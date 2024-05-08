// 1. Navbar
const navOpenBtn = document.querySelector(".navbar-open-btn");
const navLinks = document.querySelector(".navbar-links");
const introHeader = document.querySelector(".intro-header");
const navCloseBtn = document.querySelector(".navbar-close-btn");

navOpenBtn.addEventListener("click", () => {
  navLinks.classList.toggle("element-disappear");
  introHeader.classList.toggle("element-disappear");
  navOpenBtn.classList.toggle("element-disappear");
  navCloseBtn.classList.toggle("element-disappear");
});

navCloseBtn.addEventListener("click", () => {
  navLinks.classList.toggle("element-disappear");
  introHeader.classList.toggle("element-disappear");
  navOpenBtn.classList.toggle("element-disappear");
  navCloseBtn.classList.toggle("element-disappear");
});

const moreChefsBtn = document.querySelector(".more-chefs-btn");
moreChefsBtn.addEventListener("click", () => {
  const chefArticles = document.querySelectorAll(".chef-article");
  chefArticles.forEach((article) => {
    article.classList.remove("chef-article-hidden");
    moreChefsBtn.classList.add("element-disappear");
  });
});

// ===================

// window.addEventListener("load", () => {
//   if (window.innerWidth > 750) {
//     const owlCarousel = document.querySelector(".oc");
//     owlCarousel.classList.add("owl-carousel");
//     owlCarousel.classList.add("owl-theme");
//     console.log(`hello`);
//   }
// });

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 750) {
//     const owlCarousel = document.querySelector(".oc");
//     owlCarousel.classList.add("owl-carousel");
//     owlCarousel.classList.add("owl-theme");
//     console.log(`hello`);
//   }
// });

///////////////
