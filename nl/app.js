const navToggle = document.querySelector(".nav__toggle-container");
const navCloseBtn = document.querySelector(".nav__toggle-close-btn");
const navOpenBtn = document.querySelector(".nav__toggle-open-btn");
const navContainer = document.querySelector(".nav__links-container");
const navUnderline = document.querySelector(".nav__underline");
const main = document.querySelector("main");

navToggle.addEventListener("click", function () {
  navContainer.classList.toggle("nav__links-container-toggle");
  main.classList.toggle("element-disappear");
  navOpenBtn.classList.toggle("element-disappear");
  navUnderline.classList.toggle("element-disappear");
  navCloseBtn.classList.toggle("element-appear");

  if (navContainer.classList.contains("nav__links-container-toggle")) {
    document.body.style.backgroundRepeat = `repeat`;
  } else {
    document.body.style.backgroundRepeat = `no-repeat`;
  }
});

window.addEventListener("resize", function () {
  const docWidth = document.body.clientWidth;

  if (docWidth > 700) {
    main.classList.remove("element-disappear");
    navContainer.classList.remove("nav__links-container-toggle");
    main.classList.remove("element-disappear");
    navOpenBtn.classList.remove("element-disappear");
    navUnderline.classList.remove("element-disappear");
    navCloseBtn.classList.remove("element-appear");
  }
});

const finalDonation = document.getElementById("final-donation");
const treePack = JSON.parse(localStorage.getItem("Value1"));
const beechTree = JSON.parse(localStorage.getItem("Value2"));
const rowanTree = JSON.parse(localStorage.getItem("Value3"));
const scotsPineTree = JSON.parse(localStorage.getItem("Value4"));
const otherDonation = JSON.parse(localStorage.getItem("Value5"));

const totalDonationAmount = () => {
  if (treePack === null) {
    localStorage.setItem("Value1", 0);
  }

  if (beechTree === null) {
    localStorage.setItem("Value2", 0);
  }

  if (rowanTree === null) {
    localStorage.setItem("Value3", 0);
  }

  if (scotsPineTree === null) {
    localStorage.setItem("Value4", 0);
  }

  if (otherDonation === null) {
    localStorage.setItem("Value5", 0);
  }

  const string =
    treePack + beechTree + rowanTree + scotsPineTree + otherDonation;
  localStorage.clear();
  return string;
};

window.addEventListener("load", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  console.log(width, height);
});
