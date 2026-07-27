document.querySelectorAll("[data-open-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("data-open-target");
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();
    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

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
