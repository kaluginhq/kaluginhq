const initMobileMenu = () => {
  const toggle = document.querySelector(".site-header__toggle");
  const menu = document.querySelector(".site-header__menu");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const closeButton = document.querySelector(".site-header__close");
  const links = menu ? menu.querySelectorAll(".site-header__link") : [];
  const firstLink = links.length ? links[0] : null;

  if (!toggle || !menu || !backdrop) return;

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  };

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    if (firstLink) {
      firstLink.focus();
    }
  };

  const toggleMenu = () => {
    if (document.body.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", closeMenu);
  if (closeButton) {
    closeButton.addEventListener("click", closeMenu);
  }
  links.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
};

const initCaseLightbox = () => {
  const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (!mediaQuery.matches) return;

  const images = document.querySelectorAll(".case-section img");
  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className = "case-lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Просмотр изображения");

  const overlayImage = document.createElement("img");
  overlayImage.className = "case-lightbox__image";

  const closeButton = document.createElement("button");
  closeButton.className = "case-lightbox__close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Закрыть");
  closeButton.textContent = "×";

  overlay.appendChild(overlayImage);
  overlay.appendChild(closeButton);
  document.body.appendChild(overlay);

  let lastActiveElement = null;

  const closeLightbox = () => {
    overlay.classList.remove("is-open");
    document.body.classList.remove("is-lightbox-open");
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  const openLightbox = (img) => {
    lastActiveElement = document.activeElement;
    overlayImage.src = img.currentSrc || img.src;
    overlayImage.alt = img.alt || "";
    overlay.classList.add("is-open");
    document.body.classList.add("is-lightbox-open");
    closeButton.focus();
  };

  images.forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });

  closeButton.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeLightbox();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCaseLightbox();
});
