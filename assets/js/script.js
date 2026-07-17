const dialog = document.querySelector("#login-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const passwordInput = document.querySelector("#password");
const formMessage = document.querySelector("#form-message");
const closeButton = document.querySelector("#close-dialog");
const form = document.querySelector(".login-form");
const countdownDays = document.querySelector("#countdown-days");
const countdownLabel = document.querySelector(".countdown-label");

const portalNames = {
  guest: "Gästebereich",
  service: "Hochzeitsteam"
};

const portalPasswords = {
  guest: "Wenzel",
  service: "04042028"
};

const portalTargets = {
  guest: "gast.html",
  service: "hochzeitsteam.html"
};

let activePortal = null;

function updateCountdown() {
  if (!countdownDays || !countdownLabel) return;

  const weddingDateUtc = Date.UTC(2028, 4, 20);
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(
    0,
    Math.ceil((weddingDateUtc - todayUtc) / millisecondsPerDay)
  );

  countdownDays.textContent = String(daysRemaining);
  countdownLabel.textContent =
    daysRemaining === 1
      ? "Tag bis zu unserer Hochzeit"
      : "Tage bis zu unserer Hochzeit";
}

updateCountdown();

if (dialog && dialogTitle && passwordInput && formMessage && closeButton && form) {
  document.querySelectorAll("[data-portal]").forEach((button) => {
    button.addEventListener("click", () => {
      activePortal = button.dataset.portal;
      dialogTitle.textContent = portalNames[activePortal];
      passwordInput.value = "";
      formMessage.textContent = "";
      dialog.showModal();
      setTimeout(() => passwordInput.focus(), 100);
    });
  });

  closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (!enteredPassword) {
      formMessage.textContent = "Bitte gebt zunächst ein Passwort ein.";
      return;
    }

    if (!activePortal || enteredPassword !== portalPasswords[activePortal]) {
      formMessage.textContent = "Das Passwort ist leider nicht korrekt.";
      return;
    }

    window.location.href = portalTargets[activePortal];
  });
}

/*
  Diese Passwörter dienen nur der aktuellen Testphase auf GitHub Pages.
  Vor der Veröffentlichung werden sie durch eine sichere serverseitige Lösung ersetzt.
*/
