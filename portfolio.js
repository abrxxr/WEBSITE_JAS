const portfolioGrid = document.querySelector("[data-portfolio-grid]");
const portfolioToolbar = document.querySelector(".portfolio-toolbar");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const portfolioItems = window.portfolioItems || [];
const categories = [...new Map(portfolioItems.map((item) => [item.slug, item.category])).entries()];

const renderFilters = () => {
  categories.forEach(([slug, category]) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.type = "button";
    button.dataset.filter = slug;
    button.textContent = category;
    portfolioToolbar.appendChild(button);
  });
};

const renderGallery = (filter = "all") => {
  const visibleItems = filter === "all" ? portfolioItems : portfolioItems.filter((item) => item.slug === filter);
  portfolioGrid.innerHTML = "";

  visibleItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "portfolio-item";
    button.dataset.src = item.src;
    button.dataset.title = item.title;
    button.innerHTML = `
      <img src="./${item.thumb}" alt="${item.title}" loading="lazy">
      <span>${item.category}</span>
    `;
    portfolioGrid.appendChild(button);
  });
};

const openLightbox = (src, title) => {
  lightboxImage.src = `./${src}`;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
};

portfolioToolbar.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  portfolioToolbar.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderGallery(button.dataset.filter);
});

portfolioGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".portfolio-item");
  if (!button) return;
  openLightbox(button.dataset.src, button.dataset.title);
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});

renderFilters();
renderGallery();
