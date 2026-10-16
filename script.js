/* J'zy Yoga landing page interactions.
   Before launch, replace the placeholder with Jasmine's full WhatsApp number:
   country code + mobile number, digits only. For India, start with 91.
*/
const JZY_WHATSAPP_NUMBER = "REPLACE_WITH_JASMINE_NUMBER";
const DEFAULT_MESSAGE = "Hi Jasmine! I'd love to know more about J'zy Yoga & Fitness Studio. Could you share the available classes and timings?";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", isOpen);
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    });
  });
}

const setupNotice = document.querySelector("#whatsapp-setup-notice");
const hasWhatsAppNumber = /^\d{10,15}$/.test(JZY_WHATSAPP_NUMBER);

document.querySelectorAll(".whatsapp-link").forEach(link => {
  const interest = link.dataset.interest;
  const message = interest
    ? "Hi Jasmine! I'd like to know more about " + interest + " at J'zy Yoga & Fitness Studio. Could you share the available timings and details?"
    : DEFAULT_MESSAGE;

  if (hasWhatsAppNumber) {
    link.href = "https://wa.me/" + JZY_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contact";
    link.addEventListener("click", event => {
      event.preventDefault();
      if (setupNotice) {
        setupNotice.hidden = false;
        setupNotice.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(
  ".hero-copy,.hero-visual,.class-card,.approach-heading,.value-item,.jasmine-visual,.jasmine-copy,.step-card,.contact-card"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("reveal-ready");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = (index % 3) * 70 + "ms";
    observer.observe(item);
  });
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
