// Flip cards (Education + Experience + Certifications) — click/tap + keyboard accessible
document.addEventListener("click", (e) => {
  const card = e.target.closest(".flip-card");
  if (!card) return;

  // don't flip when clicking a real link
  if (e.target.closest("a")) return;

  card.classList.toggle("is-flipped");
});

document.addEventListener("keydown", (e) => {
  const card = document.activeElement?.closest?.(".flip-card");
  if (!card) return;

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    card.classList.toggle("is-flipped");
  }
});
