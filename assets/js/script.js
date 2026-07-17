const dialog = document.querySelector("#login-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const passwordInput = document.querySelector("#password");
const formMessage = document.querySelector("#form-message");
const closeButton = document.querySelector("#close-dialog");
const form = document.querySelector(".login-form");

const portalNames = {
  guest: "Gästebereich",
  service: "Dienstleisterbereich"
};

document.querySelectorAll("[data-portal]").forEach((button) => {
  button.addEventListener("click", () => {
    dialogTitle.textContent = portalNames[button.dataset.portal];
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

  if (!passwordInput.value.trim()) {
    formMessage.textContent = "Bitte gebt zunächst ein Passwort ein.";
    return;
  }

  formMessage.textContent =
    "Die geschützten Bereiche werden in der nächsten Version eingerichtet.";
});

/*
  Echte Passwörter werden später nicht sichtbar in dieser Datei gespeichert.
  Dafür setzen wir eine sichere serverseitige Lösung ein.
*/
