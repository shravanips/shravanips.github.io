(function () {
    const modal = document.getElementById("mediaModal");
    if (!modal) return;
  
    const img = document.getElementById("mediaModalImg");
    const title = document.getElementById("mediaModalTitle");
    const caption = document.getElementById("mediaModalCaption");
  
    function openModal({ src, t, c }) {
      img.src = src;
      img.alt = t || "Media image";
      title.textContent = t || "";
      caption.textContent = c || "";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  
    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      img.src = "";
      document.body.style.overflow = "";
    }
  
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".media-card[data-media='photo']");
      if (card) {
        openModal({
          src: card.getAttribute("data-src"),
          t: card.getAttribute("data-title"),
          c: card.getAttribute("data-caption")
        });
        return;
      }
      if (e.target.closest("[data-close='true']")) closeModal();
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  })();
  