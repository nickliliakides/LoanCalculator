// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // Show loader for 2 seconds
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results function
function calculateResults() {
  // UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  const principalAmount = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const m = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principalAmount * m * calculatedInterest) / (m - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (
      monthly * calculatedPayments -
      principalAmount
    ).toFixed(2);
    // Hide loader
    document.getElementById("loading").style.display = "none";
    // Show results
    document.getElementById("results").style.display = "block";
  } else {
    showError("Something went wrong! Please check your numbers.");
  }
}

// Show error function
function showError(error) {
  // Hide loader
  document.getElementById("loading").style.display = "none";
  // Hide results
  document.getElementById("results").style.display = "none";
  // Get elements
  const card = document.querySelector(".card");
  const results = document.querySelector("#results");
  // Create a div element
  const erDiv = document.createElement("div");
  // Add clash to the div element
  erDiv.className = "alert alert-danger";
  // Create text node and appent to the div element
  erDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(erDiv, results);
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// // Show error function my version with icon that allows the user to close the alert.
// function showError(error) {
//   // Get elements
//   const card = document.querySelector('.card');
//   const heading = document.querySelector('.heading');
//   // Create a div element
//   const erDiv = document.createElement('div');
//   // Add clash to the div element
//   erDiv.className = 'alert alert-danger alert-dismissible';
//   // Appent to the div element error message and the 'x' icon to close the message
//   erDiv.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>' + error ;
//   // Insert error above heading
//   card.insertBefore(erDiv, heading);
//   console.log(erDiv);
// }

// Clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
