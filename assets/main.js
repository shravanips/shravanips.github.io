
(() => {
  // ==========================================
  // 1. LIGHT / DARK MODE
  // ==========================================

  const root = document.documentElement;

  try {
    const stored = localStorage.getItem("portfolio-theme");

    if (stored) {
      root.dataset.theme = stored;
    }
  } catch (error) {
    console.warn("Theme preference unavailable:", error);
  }

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";

      root.dataset.theme = next;

      try {
        localStorage.setItem("portfolio-theme", next);
      } catch (error) {
        console.warn("Unable to save theme preference:", error);
      }
    });
  });

  // ==========================================
  // 2. WEBSITE SEARCH
  // Shortcut: Cmd + K (Mac) / Ctrl + K
  // ==========================================

  const search = document.querySelector("#site-search");

  const openSearch = () => {
    if (!search || search.open) return;

    search.showModal();
    search.querySelector("input")?.focus();
  };

  const closeSearch = () => {
    if (search?.open) {
      search.close();
    }
  };

  document.addEventListener("keydown", (event) => {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      openSearch();
    }
  });

  document
    .querySelector("[data-search-open]")
    ?.addEventListener("click", openSearch);

  document
    .querySelector("[data-search-close]")
    ?.addEventListener("click", closeSearch);

  // Filter search results while typing
  const input = search?.querySelector("input");

  input?.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();

    search.querySelectorAll("[data-search-item]").forEach((item) => {
      item.hidden = !item.textContent.toLowerCase().includes(query);
    });
  });

  // Close search when clicking outside the dialog
  search?.addEventListener("click", (event) => {
    if (event.target === search) {
      closeSearch();
    }
  });

  // ==========================================
  // 3. PROJECT CATEGORY FILTERS
  // ==========================================

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      // Update active filter button
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      // Show matching projects
      document.querySelectorAll("[data-category]").forEach((project) => {
        project.hidden =
          selectedCategory !== "All" &&
          project.dataset.category !== selectedCategory;
      });
    });
  });

  // ==========================================
  // 4. CLICKABLE GRADUATION PHOTOGRAPH
  // ==========================================

  const photoViewer = document.getElementById("photo-viewer");
  const photoOpen = document.querySelector("[data-photo-open]");
  const photoClose = document.querySelector("[data-photo-close]");

  if (photoViewer && photoOpen && photoClose) {

    // Click the homepage photo to enlarge it
    photoOpen.addEventListener("click", () => {
      if (!photoViewer.open) {
        photoViewer.showModal();
      }
    });

    // Click X to close the enlarged photo
    photoClose.addEventListener("click", () => {
      photoViewer.close();
    });

    // Click outside the enlarged photo to close
    photoViewer.addEventListener("click", (event) => {
      const rect = photoViewer.getBoundingClientRect();

      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) {
        photoViewer.close();
      }
    });

    // Escape key is handled automatically by the dialog
  }


  // ==========================================
  // 5. MISC — CLICKABLE PHOTOGRAPHY GALLERY
  // ==========================================

  const miscDialog = document.getElementById("misc-photo-dialog");
  const miscPhotoData = document.getElementById("misc-photo-data");

  if (miscDialog && miscPhotoData) {
    let miscPhotos = [];

    try {
      miscPhotos = JSON.parse(miscPhotoData.textContent);
    } catch (error) {
      console.error("Unable to load photography data:", error);
    }

    if (Array.isArray(miscPhotos) && miscPhotos.length > 0) {
      const miscImage = document.getElementById("misc-dialog-image");
      const miscTitle = document.getElementById("misc-dialog-title");
      const miscDescription = document.getElementById("misc-dialog-description");
      const miscMeta = document.getElementById("misc-dialog-meta");

      const miscClose = miscDialog.querySelector(".misc-dialog-close");
      const miscPrev = miscDialog.querySelector(".misc-dialog-prev");
      const miscNext = miscDialog.querySelector(".misc-dialog-next");

      let currentPhotoIndex = 0;

      function showMiscPhoto(index) {
        currentPhotoIndex =
          (index + miscPhotos.length) % miscPhotos.length;

        const photo = miscPhotos[currentPhotoIndex];

        miscImage.src = photo.image;
        miscImage.alt = photo.description || photo.title || "Photograph";

        miscTitle.textContent = photo.title || "";
        miscDescription.textContent = photo.description || "";

        miscMeta.textContent = [
          photo.category,
          photo.location,
          photo.year,
          photo.camera
        ].filter(Boolean).join(" · ");
      }

      // Open a photograph.
      document.querySelectorAll(".misc-photo-trigger").forEach(button => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.galleryIndex);

          showMiscPhoto(index);
          miscDialog.showModal();
        });
      });

      // Close the viewer.
      miscClose.addEventListener("click", () => {
        miscDialog.close();
      });

      // Navigate between photographs.
      miscPrev.addEventListener("click", () => {
        showMiscPhoto(currentPhotoIndex - 1);
      });

      miscNext.addEventListener("click", () => {
        showMiscPhoto(currentPhotoIndex + 1);
      });

      // Keyboard navigation.
      miscDialog.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showMiscPhoto(currentPhotoIndex - 1);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          showMiscPhoto(currentPhotoIndex + 1);
        }
      });

      // Close when clicking outside the dialog.
      miscDialog.addEventListener("click", event => {
        const rect = miscDialog.getBoundingClientRect();

        const clickedOutside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (clickedOutside) {
          miscDialog.close();
        }
      });

      // Clear the full-size image after closing.
      miscDialog.addEventListener("close", () => {
        miscImage.removeAttribute("src");
      });
    }
  }


})();
