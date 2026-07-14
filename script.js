const header = document.querySelector('[data-header]');

const updateHeader = () => {
  if (!header || header.classList.contains('is-solid')) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const coverageTabs = [...document.querySelectorAll('[data-coverage-tab]')];
const coveragePanels = [...document.querySelectorAll('[data-coverage-panel]')];

const selectCoverageTab = (tab) => {
  const selectedKey = tab.dataset.coverageTab;

  coverageTabs.forEach((item) => {
    const isSelected = item === tab;
    item.classList.toggle('is-active', isSelected);
    item.setAttribute('aria-selected', String(isSelected));
    item.tabIndex = isSelected ? 0 : -1;
  });

  coveragePanels.forEach((panel) => {
    panel.hidden = panel.dataset.coveragePanel !== selectedKey;
  });
};

coverageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCoverageTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % coverageTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + coverageTabs.length) % coverageTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = coverageTabs.length - 1;

    const nextTab = coverageTabs[nextIndex];
    selectCoverageTab(nextTab);
    nextTab.focus();
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = button.getAttribute('aria-expanded') !== 'true';

    item.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
    answer.hidden = !willOpen;
  });
});

document.querySelectorAll('[data-current-year]').forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
