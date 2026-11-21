document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 70 });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const selector = link.getAttribute('href');
      if (!selector || selector === '#') return;
      const target = document.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.service-card, .product-card, .news-feature, .news-list article').forEach((item, index) => {
    item.style.setProperty('--stagger-delay', `${Math.min(index * 70, 350)}ms`);
  });
});
