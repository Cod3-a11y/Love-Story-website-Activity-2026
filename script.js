/* =========================================================
   ACTIVITY 3 — ROMEO & JULIET: DARK-HUMOR LOVE STORY
   Mobile navigation, reveal animations, countdown, demo RSVP.
   ========================================================= */

const preloader = document.getElementById("preloader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("siteHeader");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    preloader?.classList.add("hidden");
  }, 350);
});

/* Mobile navigation */
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

/* Header appearance while scrolling */
const updateHeader = () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 35);
};
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* Reveal content as it enters the screen. */
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* Countdown to the fictional memorial: October 31, 2026 at 6 PM local time. */
const memorialDate = new Date(2026, 9, 31, 18, 0, 0).getTime();
const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
const countdownStatus = document.getElementById("countdownStatus");

function updateCountdown() {
  const distance = memorialDate - Date.now();
  if (distance <= 0) {
    Object.values(countdownFields).forEach((field) => {
      if (field) field.textContent = "00";
    });
    if (countdownStatus) {
      countdownStatus.textContent = "The fictional memorial date has arrived. Verona still needs a group chat.";
    }
    return;
  }

  const values = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
  Object.entries(values).forEach(([key, value]) => {
    if (countdownFields[key]) countdownFields[key].textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
if (Date.now() < memorialDate) window.setInterval(updateCountdown, 1000);

/* Front-end-only RSVP: nothing is uploaded or saved. */
const rsvpForm = document.getElementById("rsvpForm");
const formFeedback = document.getElementById("formFeedback");
if (rsvpForm && formFeedback) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const guestName = document.getElementById("guestName").value.trim();
    const attendance = document.getElementById("attendance").value;
    if (!guestName || !attendance) {
      formFeedback.textContent = "Please enter your name and choose an RSVP response.";
      return;
    }

    const responses = {
      yes: "You're on the fictional guest list. Please leave all swords at home.",
      maybe: "A cautious answer. Verona could have used more of those.",
      no: "Wise choice. History appreciates your risk assessment."
    };
    formFeedback.textContent = `Thanks, ${guestName}. ${responses[attendance]}`;
    rsvpForm.reset();
  });
}
