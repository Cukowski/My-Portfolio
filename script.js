const navbar = document.querySelector('.navbar');
const navbarLinks = [...document.querySelectorAll('.navbar-link')];
const sections = navbarLinks.map(link => document.querySelector(link.getAttribute('href')));

function highlightSection() {
  let activeIndex = 0;
  sections.forEach((section, index) => {
    if (section && section.getBoundingClientRect().top <= navbar.offsetHeight + 40) activeIndex = index;
  });
  navbarLinks.forEach((link, index) => {
    const active = index === activeIndex;
    link.classList.toggle('change', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', highlightSection, { passive: true });
window.addEventListener('resize', highlightSection);
highlightSection();
