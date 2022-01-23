export default (() => {
  const { body } = document;
  const header = document.querySelector('[data-header]');
  const btnNavToggle = document.querySelector('[data-btn-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const firstLink = nav.querySelector('a');

  let isOpen = false;

  const openNav = () => {
    isOpen = true;

    btnNavToggle.setAttribute('aria-expanded', isOpen);

    btnNavToggle.classList.add('is-active');
    nav.classList.add('active');

    firstLink.focus();

    body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    isOpen = false;

    btnNavToggle.setAttribute('aria-expanded', isOpen);

    btnNavToggle.classList.remove('is-active');
    nav.classList.remove('active');

    body.style.overflow = 'auto';
  };

  const navToggle = () => {
    isOpen ? closeNav() : openNav();
  };

  const isClickOutside = e => {
    const isOutside = !e.target.closest('[data-nav]');
    const isBtnNavToggle = e.target.closest('[data-btn-nav-toggle]') === btnNavToggle;

    if(isOutside && !isBtnNavToggle) {
      closeNav();
    }
  };

  const isClickLink = e => {
    if(e.target.tagName === 'A') closeNav();
  };

  const fixNav = () => {
    window.pageYOffset > 1
      ? header.classList.add('sticky-header')
      : header.classList.remove('sticky-header');
  };

  btnNavToggle.addEventListener('click', navToggle);
  nav.addEventListener('click', isClickLink);
  body.addEventListener('click', isClickOutside);
  window.addEventListener('load', fixNav);
  window.addEventListener('scroll', fixNav);
})();
