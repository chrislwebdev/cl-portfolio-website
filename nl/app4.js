const donateFinalize = () => {
  finalDonation.innerHTML = `£${totalDonationAmount()}`;
  //   finalDonation.innerHTML = totalDonationAmount();
  if (finalDonation.innerHTML === `£0`) {
    window.location.href = "./donate.html";
  }
};

donateFinalize();
