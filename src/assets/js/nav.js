export default (() => {
  const { body } = document;
  const header = document.querySelector('[data-header]');
  const btnNavToggle = document.querySelector('[data-btn-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  let isOpen = false;

  const openNav = () => {
    isOpen = true;

    btnNavToggle.setAttribute('aria-expanded', isOpen);

    btnNavToggle.classList.add('is-active');
    nav.classList.add('active');

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

  const fixNav = () => {
    window.pageYOffset > 1
      ? header.classList.add('sticky-header')
      : header.classList.remove('sticky-header');
  };

  btnNavToggle.addEventListener('click', navToggle);
  body.addEventListener('click', isClickOutside);
  window.addEventListener('scroll', fixNav);
})();
