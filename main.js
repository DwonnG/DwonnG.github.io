(function () {
  const nav = document.querySelector(".top-nav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [...navLinks]
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);

    const y = window.scrollY + nav.offsetHeight + 40;
    let current = sections[0]?.link;
    for (const { link, el } of sections) {
      if (el.offsetTop <= y) current = link;
    }
    navLinks.forEach((a) => a.classList.toggle("is-active", a === current));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll(".reveal");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const timelineDetails = document.querySelectorAll(".timeline-details");
  timelineDetails.forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      timelineDetails.forEach((other) => {
        if (other !== details && other.open) other.open = false;
      });
    });
  });
})();
