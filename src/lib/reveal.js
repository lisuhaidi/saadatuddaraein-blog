function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(el => observer.observe(el));
}

// initial load
document.addEventListener("astro:page-load", initReveal);

// setiap navigasi view transition
document.addEventListener("astro:after-swap", () => {
  // tunggu DOM client components selesai hydrate
  requestAnimationFrame(() => {
    initReveal();
  });
});
