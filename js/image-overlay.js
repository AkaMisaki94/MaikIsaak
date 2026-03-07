function initImageOverlayZoom(selector = "[data-image-overlay]") {
  const images = Array.from(document.querySelectorAll(selector));
  if (!images.length) return;

  let overlay = document.getElementById("image-overlay");
  let previewImage = null;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  const clampScale = (value) => Math.min(4, Math.max(1, value));
  const applyTransform = () => {
    if (!previewImage) return;
    previewImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    previewImage.classList.toggle("is-zoomed", scale > 1);
  };

  const resetTransform = () => {
    scale = 1;
    translateX = 0;
    translateY = 0;
    isDragging = false;
    if (!previewImage) return;
    previewImage.classList.remove("is-dragging", "is-zoomed");
    applyTransform();
  };

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "image-overlay";
    overlay.className = "image-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const closeButton = document.createElement("button");
    closeButton.className = "image-overlay__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close image preview");
    closeButton.innerHTML =
      '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 9L23 23M23 9L9 23"/></svg>';

    previewImage = document.createElement("img");
    previewImage.className = "image-overlay__image";
    previewImage.alt = "";

    overlay.appendChild(closeButton);
    overlay.appendChild(previewImage);
    document.body.appendChild(overlay);

    const closeOverlay = () => {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      previewImage.removeAttribute("src");
      resetTransform();
    };

    closeButton.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeOverlay();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeOverlay();
      } else if (overlay.classList.contains("is-open") && (event.key === "+" || event.key === "=")) {
        event.preventDefault();
        scale = clampScale(scale + 0.25);
        applyTransform();
      } else if (overlay.classList.contains("is-open") && event.key === "-") {
        event.preventDefault();
        scale = clampScale(scale - 0.25);
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
        applyTransform();
      } else if (overlay.classList.contains("is-open") && event.key === "0") {
        event.preventDefault();
        resetTransform();
      }
    });

    previewImage.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const delta = event.deltaY < 0 ? 0.2 : -0.2;
        scale = clampScale(scale + delta);
        if (scale === 1) {
          translateX = 0;
          translateY = 0;
        }
        applyTransform();
      },
      { passive: false }
    );

    previewImage.addEventListener("dblclick", (event) => {
      event.preventDefault();
      if (scale > 1) {
        resetTransform();
      } else {
        scale = 2;
        applyTransform();
      }
    });

    previewImage.addEventListener("pointerdown", (event) => {
      if (scale <= 1) return;
      isDragging = true;
      dragStartX = event.clientX - translateX;
      dragStartY = event.clientY - translateY;
      previewImage.classList.add("is-dragging");
      previewImage.setPointerCapture(event.pointerId);
    });

    previewImage.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      translateX = event.clientX - dragStartX;
      translateY = event.clientY - dragStartY;
      applyTransform();
    });

    const stopDragging = () => {
      isDragging = false;
      if (!previewImage) return;
      previewImage.classList.remove("is-dragging");
    };

    previewImage.addEventListener("pointerup", stopDragging);
    previewImage.addEventListener("pointercancel", stopDragging);
  }

  if (!previewImage) {
    previewImage = overlay.querySelector(".image-overlay__image");
  }

  const openOverlay = (image) => {
    resetTransform();
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt || "";
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
  };

  images.forEach((image) => {
    if (image.dataset.overlayBound === "true") return;
    image.dataset.overlayBound = "true";
    image.classList.add("image-overlay-trigger");
    image.setAttribute("role", "button");
    image.setAttribute("tabindex", "0");

    image.addEventListener("click", () => openOverlay(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openOverlay(image);
      }
    });
  });
}

window.initImageOverlayZoom = initImageOverlayZoom;
