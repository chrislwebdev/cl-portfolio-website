const donationForm = document.querySelector(".donation-form");
const result = document.querySelector(".result");
const submitBtn = document.querySelector(".submit-btn");
const hiddenAlert = document.querySelector(".hidden-alert");

donationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const checkbox1 = document.querySelector('input[id="donation-1"]:checked');
  const checkbox2 = document.querySelector('input[id="donation-2"]:checked');
  const checkbox3 = document.querySelector('input[id="donation-3"]:checked');
  const checkbox4 = document.querySelector('input[id="donation-4"]:checked');
  const checkbox5 = document.querySelector('input[id="donation-5"]');

  if (checkbox1) {
    localStorage.setItem("Value1", checkbox1.value);
  }
  if (checkbox2) {
    localStorage.setItem("Value2", checkbox2.value);
  }
  if (checkbox3) {
    localStorage.setItem("Value3", checkbox3.value);
  }
  if (checkbox4) {
    localStorage.setItem("Value4", checkbox4.value);
  }
  if (checkbox5) {
    localStorage.setItem("Value5", checkbox5.value);
  }

  const itemCheck1 = JSON.parse(localStorage.getItem("Value1"));
  const itemCheck2 = JSON.parse(localStorage.getItem("Value2"));
  const itemCheck3 = JSON.parse(localStorage.getItem("Value3"));
  const itemCheck4 = JSON.parse(localStorage.getItem("Value4"));
  const itemCheck5 = JSON.parse(localStorage.getItem("Value5"));
  if (
    itemCheck1 === null &&
    itemCheck2 === null &&
    itemCheck3 === null &&
    itemCheck4 === null &&
    itemCheck5 === 0
  ) {
    hiddenAlert.classList.add("alert-display");
    setTimeout(function () {
      hiddenAlert.classList.remove("alert-display");
    }, 3000);
  } else {
    window.location.href = "./donation-finalize.html";
  }
});
