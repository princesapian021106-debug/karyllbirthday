// Karyll's birthday website interactions

const letterModal = document.getElementById("letterModal");
const openLetterButton = document.getElementById("openLetter");
const closeLetterButton = document.getElementById("closeLetter");

function openLetter() {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeLetterButton.focus();
}
function closeLetter() {
  letterModal.classList.remove("open");
  letterModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  openLetterButton.focus();
}
openLetterButton.addEventListener("click", openLetter);
closeLetterButton.addEventListener("click", closeLetter);
letterModal.querySelector("[data-close-letter]").addEventListener("click", closeLetter);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterModal.classList.contains("open")) closeLetter();
});

// Birthday wish: blow out the candles and release hearts.
document.getElementById("wishButton").addEventListener("click", () => {
  document.querySelector(".cake").classList.add("blown");
  document.getElementById("wishResult").textContent =
    "I hope every beautiful wish finds its way to you, Lovieee. ♡";
  for (let i = 0; i < 28; i++) createHeart();
});

// Surprise reveal.
document.getElementById("surpriseButton").addEventListener("click", () => {
  const message = document.getElementById("surpriseMessage");
  message.hidden = false;
  document.getElementById("surpriseButton").textContent = "A surprise just for you ♡";
  for (let i = 0; i < 35; i++) createHeart();
});

// Gentle floating hearts.
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "ambient-heart";
  heart.textContent = ["♡", "♥", "✧"][Math.floor(Math.random() * 3)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (13 + Math.random() * 18) + "px";
  heart.style.animationDuration = (5 + Math.random() * 4) + "s";
  document.getElementById("ambientHearts").appendChild(heart);
  window.setTimeout(() => heart.remove(), 9500);
}
window.setInterval(createHeart, 1900);

// Reveal sections gently as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Optional background song: add assets/background-song.mp3 to enable this button.
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const backgroundMusic = new Audio("assets/background-song.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;
let musicIsPlaying = false;

musicToggle.addEventListener("click", async () => {
  try {
    if (!musicIsPlaying) {
      await backgroundMusic.play();
      musicIsPlaying = true;
      musicLabel.textContent = "Pause our song";
      musicToggle.setAttribute("aria-label", "Pause background music");
    } else {
      backgroundMusic.pause();
      musicIsPlaying = false;
      musicLabel.textContent = "Play our song";
      musicToggle.setAttribute("aria-label", "Play background music");
    }
  } catch (error) {
    musicLabel.textContent = "Add background-song.mp3";
    console.info("Add your own background song in the assets folder to use this button.");
  }
});
backgroundMusic.addEventListener("ended", () => {
  musicIsPlaying = false;
  musicLabel.textContent = "Play our song";
});
