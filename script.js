const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const siteNav = document.querySelector("[data-site-nav]");
const quoteForm = document.querySelector("[data-quote-form]");
const whatsappButton = document.querySelector("[data-whatsapp]");
const mediaUpload = document.querySelector("[data-media-upload]");
const mediaList = document.querySelector("[data-media-list]");

const updateHeader = () => {
  if (document.body.classList.contains("portfolio-page")) {
    header.classList.add("is-scrolled");
    return;
  }
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  document.body.classList.remove("nav-open");
  header.classList.remove("is-open");
  siteNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
};

const createQuoteMessage = () => {
  const data = new FormData(quoteForm);
  const name = data.get("name") || "";
  const phone = data.get("phone") || "";
  const service = data.get("service") || "";
  const message = data.get("message") || "";
  const mediaFiles = mediaUpload ? Array.from(mediaUpload.files).map((file) => file.name) : [];
  const mediaText = mediaFiles.length
    ? mediaFiles.join(", ")
    : "No media selected";

  return [
    "Hello JAS Import Export,",
    "",
    `Name: ${name}`,
    `Phone / WhatsApp: ${phone}`,
    `Service: ${service}`,
    `Requirement: ${message}`,
    `Media / reference files: ${mediaText}`,
    "",
    "I will attach the selected media files before sending.",
  ].join("\n");
};

const updateMediaList = () => {
  if (!mediaUpload || !mediaList) return;

  const files = Array.from(mediaUpload.files);
  mediaList.textContent = files.length
    ? files.map((file) => file.name).join(", ")
    : "No files selected";
};

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    header.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMenu();
    }
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const subject = encodeURIComponent("Heat Transfer Sticker Quote Request");
    const body = encodeURIComponent(createQuoteMessage());
    window.location.href = `mailto:jasimportexport1@gmail.com?subject=${subject}&body=${body}`;
  });
}

if (whatsappButton && quoteForm) {
  whatsappButton.addEventListener("click", () => {
    if (!quoteForm.reportValidity()) return;

    const text = encodeURIComponent(createQuoteMessage());
    window.open(`https://wa.me/919841124027?text=${text}`, "_blank", "noopener");
  });
}

if (mediaUpload) {
  mediaUpload.addEventListener("change", updateMediaList);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
