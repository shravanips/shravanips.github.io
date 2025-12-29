document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-scroll-to]");
    if (!a) return;
  
    const id = a.getAttribute("data-scroll-to");
    const el = document.getElementById(id);
    if (!el) return;
  
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  