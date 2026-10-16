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

/* ---------- Reveal on scroll: every heading & body text fades up ---------- */
const revealSelectors = [
  "h1","h2","h3","h4","p",".eyebrow",".button",".card-cta",".text-cta",
  ".class-chips",".value-index",".contact-kicker",".section-footnote"
];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// mark text elements as reveal targets
const revealCandidates = document.querySelectorAll(revealSelectors.join(","));
revealCandidates.forEach(el => {
  if (!el.classList.contains("reveal")) el.classList.add("reveal");
});

// group stagger per parent
const parents = new Set();
revealCandidates.forEach(el => parents.add(el.parentElement));
parents.forEach(parent => {
  if (!parent) return;
  const items = parent.querySelectorAll(":scope > .reveal, :scope > * .reveal");
  // stagger direct-ish children only to avoid huge delays
});

// assign stagger delays based on position within nearest section/container
document.querySelectorAll("section, .breath-band, .site-footer, .top-note").forEach(container => {
  const items = container.querySelectorAll(".reveal");
  items.forEach((item, index) => {
    item.style.transitionDelay = (Math.min(index, 8) * 70) + "ms";
  });
});

if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("reveal-ready");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach(item => item.classList.add("is-visible"));
}

/* ---------- Micro-interactions ---------- */
// ripple on buttons
document.querySelectorAll(".button, .nav-cta, .card-cta").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.background = "rgba(255,255,255,.45)";
    ripple.style.width = ripple.style.height = "12px";
    ripple.style.left = (e.clientX - rect.left - 6) + "px";
    ripple.style.top = (e.clientY - rect.top - 6) + "px";
    ripple.style.transform = "scale(0)";
    ripple.style.transition = "transform .5s ease, opacity .5s ease";
    ripple.style.opacity = "1";
    if (getComputedStyle(btn).position === "static") btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);
    requestAnimationFrame(() => { ripple.style.transform = "scale(18)"; ripple.style.opacity = "0"; });
    setTimeout(() => ripple.remove(), 550);
  });
});

// parallax-ish hero sparks follow mouse (subtle)
const hero = document.querySelector(".hero");
if (hero && !reduceMotion) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    document.querySelectorAll(".hero-spark").forEach((s, i) => {
      const f = i === 0 ? 12 : -10;
      s.style.transform = `translate(${x*f}px, ${y*f}px)`;
    });
  });
  hero.addEventListener("mouseleave", () => {
    document.querySelectorAll(".hero-spark").forEach(s => { s.style.transform = ""; });
  });
}
