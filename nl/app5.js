window.addEventListener("load", function () {
  projectsAbsoluteHeight = document
    .querySelector(".project-container")
    .getBoundingClientRect().height;
  const projectRelative = document.querySelector(".projects-relative");
  projectRelative.style.height = `${projectsAbsoluteHeight}px`;
});

window.addEventListener("resize", function () {
  projectsAbsoluteHeight = document
    .querySelector(".project-container")
    .getBoundingClientRect().height;
  const projectRelative = document.querySelector(".projects-relative");
  projectRelative.style.height = `${projectsAbsoluteHeight}px`;
});
