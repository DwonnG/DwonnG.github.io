(function () {
  function trackEvent(name, props) {
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function") {
        window.goatcounter.count({
          path: "event/" + name,
          title: (props && props.label) || name,
          event: true,
        });
      }
    } catch (_) {}
  }

  function bindClickTracking() {
    const targets = [
      { sel: 'a[href^="mailto:"]', name: "email-click" },
      { sel: 'a[href^="tel:"]', name: "phone-click" },
      { sel: 'a[href$="Resume.pdf"], a[download$="Resume.pdf"]', name: "resume-download" },
      { sel: 'a[href*="linkedin.com"]', name: "linkedin-click" },
      { sel: 'a[href*="github.com"]', name: "github-click" },
    ];
    targets.forEach(({ sel, name }) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener("click", () => {
          trackEvent(name, { label: el.textContent.trim() || el.getAttribute("href") });
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindClickTracking);
  } else {
    bindClickTracking();
  }

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
  const reveal = (el) => el.classList.add("is-visible");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => observer.observe(el));
    // Safety net: if IO never fires for an element (some iOS edge cases),
    // make sure everything is visible after 2.5s so content isn't stuck hidden.
    window.setTimeout(() => revealEls.forEach(reveal), 2500);
  } else {
    revealEls.forEach(reveal);
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

  const featuredCard = document.querySelector(".project-card--featured");
  if (featuredCard) {
    const sliceLinks = featuredCard.querySelectorAll(".pyramid-slices a");
    const slices = featuredCard.querySelectorAll(".pyramid-slice[data-tier]");
    const pillsContainer = featuredCard.querySelector(".pyramid-tech");
    const HINT_TEXT = "Hover the pyramid for more details";

    function renderHint() {
      if (!pillsContainer) return;
      const li = document.createElement("li");
      li.textContent = HINT_TEXT;
      li.classList.add("pyramid-tech-hint");
      pillsContainer.replaceChildren(li);
    }

    function showTierPills(slice) {
      if (!pillsContainer || !slice) return;
      const tools = (slice.dataset.sub || "")
        .split("·")
        .map((s) => s.trim())
        .filter(Boolean);
      const items = tools.map((tool, i) => {
        const li = document.createElement("li");
        li.textContent = tool;
        li.style.setProperty("--pill-delay", i * 40 + "ms");
        return li;
      });
      pillsContainer.replaceChildren(...items);
    }

    function highlight(activeTier) {
      slices.forEach((slice) => {
        const isActive = !activeTier || slice.dataset.tier === activeTier;
        slice.classList.toggle("is-linked", Boolean(activeTier) && isActive);
        slice.classList.toggle("is-dimmed", Boolean(activeTier) && !isActive);
      });
    }

    renderHint();

    sliceLinks.forEach((link) => {
      const polygon = link.querySelector(".pyramid-slice");
      if (!polygon) return;
      const activate = () => {
        highlight(polygon.dataset.tier);
        showTierPills(polygon);
      };
      const deactivate = () => {
        highlight(null);
        renderHint();
      };
      link.addEventListener("mouseenter", activate);
      link.addEventListener("mouseleave", deactivate);
      link.addEventListener("focusin", activate);
      link.addEventListener("focusout", deactivate);
    });
  }
})();
