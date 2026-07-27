const dialog = document.querySelector("#login-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogText = document.querySelector("#dialog-text");
const passwordInput = document.querySelector("#password");
const formMessage = document.querySelector("#form-message");
const closeButton = document.querySelector("#close-dialog");
const form = document.querySelector(".login-form");
const countdownDays = document.querySelector("#countdown-days");

const portalContent = {
  guest: {
    title: "Willkommen, ihr Lieben",
    text: "Das Passwort findet ihr auf eurer Einladung."
  },
  service: {
    title: "Hochzeitsteam",
    text: "Hier geht es zur gemeinsamen Planung unseres Tages."
  }
};

/* Nur für die Entwurfsphase. Vor der Veröffentlichung wird die Prüfung serverseitig umgesetzt. */
const portalPasswords = {
  guest: "Wenzel",
  service: "04042028"
};

const portalTargets = {
  guest: "gast.html",
  service: "ablauf-7k4m2.html"
};

let activePortal = null;

function updateCountdown() {
  if (!countdownDays) return;

  const weddingDateUtc = Date.UTC(2028, 4, 20);
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.max(0, Math.ceil((weddingDateUtc - todayUtc) / millisecondsPerDay));

  countdownDays.textContent = String(daysRemaining);
}

updateCountdown();

if (dialog && dialogTitle && dialogText && passwordInput && formMessage && closeButton && form) {
  document.querySelectorAll("[data-portal]").forEach((button) => {
    button.addEventListener("click", () => {
      activePortal = button.dataset.portal;
      const content = portalContent[activePortal];

      dialogTitle.textContent = content?.title || "Bereich öffnen";
      dialogText.textContent = content?.text || "Bitte gebt euer Passwort ein.";
      passwordInput.value = "";
      formMessage.textContent = "";
      dialog.showModal();
      window.setTimeout(() => passwordInput.focus(), 100);
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
      formMessage.textContent = "Bitte gebt zunächst das Passwort ein.";
      return;
    }

    if (!activePortal || enteredPassword !== portalPasswords[activePortal]) {
      formMessage.textContent = "Das Passwort ist leider nicht korrekt.";
      passwordInput.select();
      return;
    }

    window.location.href = portalTargets[activePortal];
  });
}
