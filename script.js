/* J'zy Yoga landing page
   Before launch, replace the WhatsApp placeholder below with Jasmine's full
   international number, digits only (India: 91 + 10-digit mobile number).
*/
const JZY_WHATSAPP_NUMBER = "REPLACE_WITH_JASMINE_NUMBER";
const DEFAULT_MESSAGE = "Hi Jasmine! I'd love to know more about J'zy Yoga & Fitness Studio. Could you share the available classes and timings?";

document.documentElement.classList.add("reveal-ready");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }));
}

document.querySelectorAll(".whatsapp-link").forEach(link => {
  const interest = link.dataset.interest;
  const message = interest
    ? `Hi Jasmine! I'd like to know more about ${interest.toLowerCase()} at J'zy Yoga & Fitness Studio. Could you share the available timings and details?`
    : DEFAULT_MESSAGE;
  if (/^\d{10,15}$/.test(JZY_WHATSAPP_NUMBER)) {
    link.href = `https://wa.me/${JZY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contact";
    link.addEventListener("click", event => {
      event.preventDefault();
      const notice = document.querySelector("#whatsapp-setup-notice");
      if (notice) {
        notice.hidden = false;
        notice.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        alert("WhatsApp is not connected yet. Add Jasmine's number in script.js before sharing this preview.");
      }
    });
  }
});

const contact = document.querySelector("#contact");
if (contact) {
  const notice = document.createElement("p");
  notice.id = "whatsapp-setup-notice";
  notice.className = "setup-notice";
  notice.hidden = true;
  notice.textContent = "Preview setup: add Jasmine's WhatsApp number in script.js to activate direct chat links.";
  contact.appendChild(notice);
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".hero-copy,.hero-art,.section-heading,.program-card,.visit-copy,.visit-card");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
