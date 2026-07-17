document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent =
        "Die Eingabe wurde für die Testansicht geprüft. Die automatische Übermittlung richten wir noch ein.";
    }
  });
});
