document.querySelectorAll('.team-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
});

document.querySelectorAll(".team-accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    const icon = detail.querySelector("summary i");
    if (icon) icon.textContent = detail.open ? "−" : "+";
  });
});
