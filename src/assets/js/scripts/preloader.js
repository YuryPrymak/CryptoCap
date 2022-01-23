export default (() => {
  const preloader = document.querySelector('[data-preloader]');

  if(!preloader) return;

  window.addEventListener('load', () => {
    preloader.classList.add('preloader-hide');

    setTimeout(() => {
      document.body.classList.remove('loading');
    }, 300);
  });
})();
