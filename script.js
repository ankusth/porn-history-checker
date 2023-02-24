// Get the check button and result div
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

// Check if the website has been visited before
const isVisited = localStorage.getItem("visited");

if (isVisited) {
  // If the website has been visited before, set the background color to red and white and display "Busted!" text
  document.body.style.background = "linear-gradient(45deg, #ff0000, #ffffff)";
  resultDiv.textContent = "Busted!";
}

// Add a click event listener to the check button
checkBtn.addEventListener("click", () => {
  const urlInput = document.getElementById("url");
  const url = urlInput.value;

  // Check if the website exists by sending a HEAD request
  fetch(url, { method: "HEAD" })
    .then(response => {
      if (response.ok) {
        // If the website exists, set the background color to red and white and display "Busted!" text
        document.body.style.background = "linear-gradient(45deg, #ff0000, #ffffff)";
        resultDiv.textContent = "Busted!";
        // Store the visited status in local storage
        localStorage.setItem("visited", true);
      } else {
        // If the website does not exist, display an error message
        resultDiv.textContent = "Website does not exist";
      }
    })
    .catch(error => {
      // If there is an error, display an error message
      resultDiv.textContent = "An error occurred while checking the website";
    });
});
