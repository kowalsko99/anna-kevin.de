document.querySelectorAll("[data-open-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("data-open-target");
    const target = document.getElementById(targetId);

    if (!target) return;
    event.preventDefault();

    if (target.tagName === "DETAILS") target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".editorial-accordion details, .faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    const icon = detail.querySelector("summary i");
    if (icon) icon.textContent = detail.open ? "−" : "+";
  });
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    if (!form.reportValidity()) return;

    if (status) {
      status.textContent = "Perfekt – alle Pflichtangaben sind vollständig. In der finalen Version würde eure Rückmeldung jetzt sicher gespeichert und per E-Mail bestätigt.";
      status.classList.add("is-success");
    }
  });
});
