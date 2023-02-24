const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

const isVisited = localStorage.getItem("visited");

if (isVisited) {
  // If the website has been visited before, set the background color to red and white and display "Busted!" text
  document.body.style.background = "linear-gradient(45deg, #ff0000, #ffffff)";
  resultDiv.textContent = "Busted!";
}

checkBtn.addEventListener("click", () => {
  const urlInput = document.getElementById("url");
  const url = urlInput.value;

  caches.match(url).then(response => {
    if (response) {
      // If the website exists in the cache, set the background color to red and white and display "Busted!" text
      document.body.style.background = "linear-gradient(45deg, #ff0000, #ffffff)";
      resultDiv.textContent = "Busted!";
      localStorage.setItem("visited", true);
    } else {
      fetch(url).then(response => {
        if (response.ok) {
          caches.open("website-cache").then(cache => {
            cache.put(url, response);
          });
          document.body.style.background = "linear-gradient(45deg, #ff0000, #ffffff)";
          resultDiv.textContent = "Busted!";
          localStorage.setItem("visited", true);
        } else {
          resultDiv.textContent = "Website does not exist";
        }
      }).catch(error => {
        resultDiv.textContent = "An error occurred while checking the website";
      });
    }
  });
});
