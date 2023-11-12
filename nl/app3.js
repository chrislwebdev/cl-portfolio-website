const projectContainer = document.querySelectorAll(".project-container");
const projectPrevBtn = document.querySelector(".project-prev-btn");
const projectNextBtn = document.querySelector(".project-next-btn");

projectContainer.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

projectPrevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

projectNextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

function carousel() {
  if (counter === projectContainer.length) {
    counter = 0;
  }

  if (counter < 0) {
    counter = projectContainer.length - 1;
  }

  projectContainer.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}
