// Select elements
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("tweet-quote");
const spinner = document.getElementById("spinner");
const body = document.body;

// Fetch a random quote
async function getQuote() {
  try {
    // Show spinner + hide text
    spinner.style.display = "block";
    quoteText.style.opacity = "0";
    quoteAuthor.style.opacity = "0";

    // Fetch from ZenQuotes API
    const response = await fetch("http://api.quotable.io/random");
    const data = await response.json();

    // Update quote text
   quoteText.textContent = `"${data.content}"`;
    quoteAuthor.textContent = `— ${data.author}`;
    
    // Change background image from Unsplash
    // const unsplashUrl = `https://source.unsplash.com/random/1920x1080/?nature,landscape,quotes,background&sig=${Date.now()}`;
    // body.style.backgroundImage = `url('${unsplashUrl}')`;

    // Hide spinner + fade in
    spinner.style.display = "none";
    setTimeout(() => {
      quoteText.style.opacity = "1";
      quoteAuthor.style.opacity = "1";
    }, 2000);
  } catch (error) {
    spinner.style.display = "none";
    quoteText.style.opacity = "1";
    quoteAuthor.style.opacity = "1";

    quoteText.textContent = "Oops! Something went wrong. Try again.";
    quoteAuthor.textContent = "";
    console.error("Error fetching quote:", error);
  }
}

// Tweet the current quote
function tweetQuote() {
  const quote = quoteText.textContent;
  const author = quoteAuthor.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `${quote} ${author}`
  )}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Load first quote on page load
getQuote();
