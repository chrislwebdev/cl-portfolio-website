import { ordinalSuffixes } from "./arrays.js";
import { dayNames } from "./arrays.js";
import { months } from "./arrays.js";

// 2. Location choice
window.addEventListener("load", () => {
  const location = sessionStorage.getItem("location");
  const location_btn = document.getElementsByName("city");
  if (location === "manchester") {
    location_btn[1].setAttribute("checked", " ");
  } else {
    sessionStorage.setItem("location", "preston");
    location_btn[0].setAttribute("checked", " ");
  }
});

const location_options_cont = document.querySelector(".location-options-cont");
location_options_cont.addEventListener("click", () => {
  const location_btn = document.getElementsByName("city");
  for (let i = 0; i < location_btn.length; i++) {
    if (location_btn[i].checked) {
      sessionStorage.setItem("location", location_btn[i].value);
      break;
    }
  }
  location.reload();
});

const choices_submit_btn = document.querySelector(".choices-submit-btn");
document.addEventListener("click", () => {
  const selected = document.querySelector(".selected-time");
  if (selected.innerText === "Time") {
    choices_submit_btn.style.background = " #eaeaea";
  } else {
    choices_submit_btn.style.background = "#7c41bf";
  }
});

const customInput = document.querySelector(".customer-info-cont");
const in1 = document.querySelector(".in-1");
const in2 = document.querySelector(".in-2");
const in3 = document.querySelector(".in-3");
const in4 = document.querySelector(".in-4");

customInput.addEventListener("input", () => {
  const finalSubmit = document.querySelector(".final-submit-btn");
  if (
    in1.value.length > 0 &&
    in2.value.length > 0 &&
    in3.value.length >= 14 &&
    in4.value.includes(`@`) &&
    in4.value.length > 5
  ) {
    finalSubmit.style.background = "#7c41bf";
  } else {
    finalSubmit.style.background = "#eaeaea";
  }
});

choices_submit_btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!sessionStorage.getItem("time")) return;

  document.querySelector(".pb-1").classList.remove("pb-active");
  document.querySelector(".pb-2").classList.add("pb-active");
  const guestsInput1 = document.getElementById("guests").value;
  const locationInput = document.querySelector(
    `input[type="radio"]:checked`
  ).value;

  const initialForm = document.querySelector(".choices-layout");
  choices_submit_btn.classList.add("element-disappear");
  initialForm.classList.add("element-disappear");
  const details_confirmation_form = document.querySelector(
    ".details-confirmation-form"
  );
  details_confirmation_form.classList.remove("element-disappear");

  const adults = document.getElementById("adults");
  const dayConfirmation = sessionStorage.getItem("day");
  const dateConfirmation = sessionStorage.getItem("date");
  const monthConfirmation = sessionStorage.getItem("month");
  const date = document.getElementById("date");
  const time = document.getElementById("time");
  const location = document.getElementById("location");
  adults.value = guestsInput1;
  date.value = `${dayConfirmation}, ${dateConfirmation}${ordinalSuffixes[dateConfirmation]} of ${monthConfirmation}`;
  time.value = sessionStorage.getItem("time");
  if (sessionStorage.getItem("location") === "preston") {
    location.value = `Preston, Lancashire
37 Market Place,
Preston
PR1 2AR
++44 (0) 20 7631 8000`;
  } else {
    location.value = `Salford / Manchester
17 Covent Square,
Salford
MF7 2JK
++44 (0) 20 7631 8000`;
  }
});

// Date picker
const date_picker_element = document.querySelector(".date-choice-cont");
const selected_date_element = document.querySelector(
  ".date-choice-cont .selected-date"
);
const dates_element = document.querySelector(
  ".date-choice-cont .date-options-cont"
);
const mth_element = document.querySelector(
  ".date-choice-cont .date-options-cont .month-container .month-name"
);
const next_mth_element = document.querySelector(
  ".date-choice-cont .date-options-cont .month-container .next-mth"
);
const prev_mth_element = document.querySelector(
  ".date-choice-cont .date-options-cont .month-container .prev-mth"
);
const days_element = document.querySelector(
  ".date-choice-cont .date-options-cont .dates-cont"
);

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + " " + year;

selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", goToNextMonth);
prev_mth_element.addEventListener("click", goToPrevMonth);
window.addEventListener("load", () => {
  selected_date_element.textContent = formatDate(selectedDate);
  sessionStorage.removeItem("time");
});

// FUNCTIONS

function toggleDatePicker(e) {
  if (e.target.classList.contains("prev-mth")) {
    return;
  }

  if (
    !checkEventPathForClass(e.path, "dates") &&
    !e.target.classList.contains("next-mth") &&
    !e.target.classList.contains("prev-mth")
  ) {
    dates_element.classList.add("active");
    const time_menu = document.querySelector(".time-options-cont");
    time_menu.classList.remove("time-ops-open");
    const selected = document.querySelector(".selected-time");
    selected.innerText = `Time`;
    sessionStorage.removeItem("time");
    const optionStyle = document.querySelectorAll(".time-option");
    optionStyle.forEach((option) => {
      option.classList.remove("time-highlight");
    });
  }
}

function goToNextMonth(e) {
  const current_month = date.getMonth();
  if (month > current_month + 1) {
    return;
  }

  month++;
  if (month > 11) {
    month = 0;
    year++;
  }

  mth_element.textContent = months[month] + " " + year;
  populateDates();
}

function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }

  let new_date = new Date();
  const current_year = new_date.getFullYear();
  const current_month = date.getMonth();

  if (year < current_year) {
    month = 0;
    year = current_year;
  }
  if (month < current_month) {
    month = current_month;
  }
  mth_element.textContent = months[month] + " " + year;
  populateDates();
}

function populateDates(e) {
  days_element.innerHTML = "";
  let amount_days = 31;

  if (month == 1) {
    amount_days = 28;
  }

  if (month == 3 || month == 5 || month == 8 || month == 10) {
    amount_days = 30;
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      day_element.classList.add("selected-day");
    }

    day_element.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;

      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;
      populateDates();
    });

    excludeDates();
    days_element.appendChild(day_element);
  }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return true;
    }
  }

  return false;
}

function excludeDates() {
  const days_past = document.querySelectorAll(
    ".date-choice-cont .date-options-cont .dates-cont .day"
  );
  days_past.forEach((e) => {
    const newDayInitial = new Date();
    const newDay = newDayInitial.getDate();
    const currentMonth = newDayInitial.getMonth();
    if (e.innerHTML < newDay && month === currentMonth) {
      e.classList.add("date-inactive");
      e.classList.remove("selected-day");
      return;
    }
  });
}

// 5. Time choice
const time_choice_cont = document.querySelectorAll(".time-choice-cont");

time_choice_cont.forEach((time_choice) => {
  const select = time_choice.querySelector(".time-selected-cont");
  // const caret = time_choice.querySelector(".caret");
  const menu = time_choice.querySelector(".time-options-cont");
  const options = time_choice.querySelectorAll(".time-options-cont li");
  const optionStyle = time_choice.querySelectorAll(
    ".time-options-cont li option"
  );
  const selected = time_choice.querySelector(".selected-time");

  select.addEventListener("click", () => {
    dates_element.classList.remove("active");
    select.classList.toggle("select-clicked");
    // caret.classList.toggle("caret-rotate");
    menu.classList.toggle("time-ops-open");
  });

  optionStyle.forEach((option) => {
    option.addEventListener("click", (e) => {
      optionStyle.forEach((otherOption) => {
        if (otherOption !== e.currentTarget) {
          otherOption.classList.remove("time-highlight");
        }
      });
      e.currentTarget.classList.add("time-highlight");
    });
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      sessionStorage.setItem("time", option.innerText);
      select.classList.remove("select-clicked");
      // caret.classList.remove("caret-rotate");
      menu.classList.remove("time-ops-open");

      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
});

function formatDate(d) {
  let day = d.getDate();
  let day_name = d.getDay();
  let month = d.getMonth() + 1;
  let currentMonth = d.getMonth();
  const current_date_initialize = new Date();
  const current_date = current_date_initialize.getDate();
  const current_month = current_date_initialize.getMonth();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  const day_actual = dayNames[day_name];
  const month_actual = months[currentMonth];
  const month_clip = month_actual.slice(0, 3);

  let year = d.getFullYear();

  const date_for_time = new Date("January 25, 2024, 18:00:00");

  const time_of_day_hours = date_for_time.getHours();
  const time_of_day_minutes = date_for_time.getMinutes();
  const current_time = `${time_of_day_hours + 2}:${time_of_day_minutes}`;
  const current_day = date_for_time.getDate();

  const times = document.querySelectorAll(".time-option");
  times.forEach((e) => {
    if (e.value < current_time && current_day === day) {
      e.classList.add("date-inactive");
      e.setAttribute("disabled", "");
    } else {
      e.classList.remove("date-inactive");
      e.removeAttribute("disabled", "");
    }
  });

  // Time

  sessionStorage.setItem("day", day_actual);
  sessionStorage.setItem("date", day);
  sessionStorage.setItem("month", month_actual);

  if (day < current_date && currentMonth === current_month) {
    return `${current_date}${ordinalSuffixes[current_date]} of ${month_clip}`;
  }

  if (day < 10) {
    const sliceDay = day.slice(1, 2);
    sessionStorage.setItem("date", sliceDay);
    return `${sliceDay}${ordinalSuffixes[sliceDay]} of ${month_clip}`;
  } else {
    return `${day}${ordinalSuffixes[day]} of ${month_clip}`;
  }
}

const backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  location.reload();
});

const details_confirmation_form = document.querySelector(
  ".details-confirmation-form"
);

details_confirmation_form.addEventListener("submit", (e) => {
  const cmn = document.getElementById("c-name");
  sessionStorage.setItem("c-name", cmn.value);
  e.preventDefault();
  if (document.getElementById("phoneInput").value.length < 14) {
    return;
  }

  const custName = document.getElementById("c-forename");
  custName.innerText = sessionStorage.getItem("c-name");
  const final_submit_align = document.querySelectorAll(".fs-al");
  final_submit_align.forEach((e) => {
    e.classList.add("booking-align");
  });
  const final_submit_dissappear = document.querySelectorAll(".fs-dis");
  final_submit_dissappear.forEach((e) => {
    e.classList.add("element-disappear");
  });
  const final_submit_appear = document.querySelectorAll(".fs-app");
  final_submit_appear.forEach((e) => {
    e.classList.remove("element-disappear");
  });
  const secondFormLs = document.querySelector(".booking-details-cont");
  secondFormLs.classList.add("form-success");
  const secondFormForReal = document.querySelector(".details-conf-form-ls");
  document.querySelector(".final-submit-btn-cont").style.display = "none";
  secondFormForReal.style.gridTemplateColumns = "1fr";

  window.scrollTo(0, 0);
});

const inputFields = document.querySelectorAll(".customer-info-input");
inputFields.forEach((input) => {
  input.addEventListener("input", () => {
    input.style.backgroundColor = "white";
  });
});
