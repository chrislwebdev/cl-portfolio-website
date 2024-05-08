const date_picker_element = document.querySelector(".date-picker");
const selected_date_element = document.querySelector(
  ".date-picker .selected-date"
);
const dates_element = document.querySelector(".date-picker .dates");
const mth_element = document.querySelector(".date-picker .dates .month .mth");
const next_mth_element = document.querySelector(
  ".date-picker .dates .month .next-mth"
);
const prev_mth_element = document.querySelector(
  ".date-picker .dates .month .prev-mth"
);
const days_element = document.querySelector(".date-picker .dates .days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursay",
  "Friday",
  "Saturday",
];

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
      day_element.classList.add("selected");
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

const ordinalSuffixes = [
  "st",
  "st",
  "nd",
  "rd",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "st",
  "nd",
  "rd",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "th",
  "st",
];

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
  const days_past = document.querySelectorAll(".date-picker .dates .days .day");
  days_past.forEach((e) => {
    const newDayInitial = new Date();
    const newDay = newDayInitial.getDate();
    const currentMonth = newDayInitial.getMonth();
    if (e.innerHTML < newDay && month === currentMonth) {
      e.classList.add("red");
      e.classList.remove("selected");
      return;
    }
  });
}

function formatDate(d) {
  let day = d.getDate();
  let day_name = d.getDay();
  let month = d.getMonth() + 1;
  let currentMonth = d.getMonth();
  const current_date_initialize = new Date();
  const current_date = current_date_initialize.getDate();
  const current_month = current_date_initialize.getMonth();
  if (day < current_date && currentMonth === current_month) {
    return null;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  const day_actual = dayNames[day_name];
  const month_actual = months[currentMonth];
  const month_clip = month_actual.slice(0, 3);
  console.log(month_actual);

  let year = d.getFullYear();

  if (day < 10) {
    sliceDay = day.slice(1, 2);
    return `${sliceDay}${ordinalSuffixes[sliceDay]} of ${month_clip}`;
  } else {
    return `${day}${ordinalSuffixes[day]} of ${month_clip}`;
  }
}
