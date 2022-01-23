export default (() => {
  const nav = document.querySelector('[data-nav]');

  if(!nav) return;

  const scroll = e => {
    if(e.target && e.target.nodeName === 'A') {
      e.preventDefault();

      const scrollToEl = document.querySelector(e.target.getAttribute('href'));

      if(scrollToEl === null) return;

      scrollToEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  nav.addEventListener('click', scroll);
})();
