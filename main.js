// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after clicking a link (mobile)
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());


// =========================
// LIGHTBOX / IMAGE VIEWER
// =========================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".lightbox-close");

function closeLightbox(){
  lightbox.classList.add("hidden");
  lightboxVideo.pause();
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load(); // force reset
}

if (lightbox && lightboxImg && lightboxVideo) {
  document.querySelectorAll(".shot").forEach((shot) => {
    shot.addEventListener("click", (e) => {
      e.preventDefault();

      const href = shot.getAttribute("href");

      // Reset
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "none";
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();

      if (href && href.match(/\.(mp4|webm|mov)$/i)) {
        lightboxVideo.src = href;
        lightboxVideo.style.display = "block";
        lightboxVideo.play();
      } else {
        lightboxImg.src = href;
        lightboxImg.style.display = "block";
      }

      lightbox.classList.remove("hidden");
    });
  });

  // Close actions
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
