document.querySelectorAll("[data-open-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("data-open-target");
    const target = document.getElementById(targetId);

    if (!target) return;

    event.preventDefault();
    target.open = true;
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const attendance = form.querySelector('[name="status"]');
  const attendanceFields = form.querySelectorAll('[data-attendance-field]');
  const updateAttendance = () => {
    const declined = attendance.value === "Absage";
    attendanceFields.forEach((field) => {
      field.hidden = declined;
      field.querySelectorAll("input, select, textarea").forEach((input) => {
        input.disabled = declined;
      });
    });
    form.querySelector('[name="persons"]').required = !declined;
  };
  attendance.addEventListener("change", updateAttendance);
  form.addEventListener("reset", () => setTimeout(updateAttendance, 0));
  updateAttendance();
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    if (status) {
      status.textContent =
        "Die Eingabe wurde für die Testansicht geprüft. Die automatische Übermittlung richten wir noch ein.";
    }
  });
});
