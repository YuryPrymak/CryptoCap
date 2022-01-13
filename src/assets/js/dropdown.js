export default (() => {
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  const dropdownToggle = e => {
    const isDropdownBtn = e.target.matches('[data-dropdown-btn]');
    let currentDropdown = null;

    if(!isDropdownBtn && e.target.closest('[data-dropdown]') !== null) return;

    if(isDropdownBtn) {
      currentDropdown = e.target.closest('[data-dropdown]');
      currentDropdown.classList.toggle('dropdown_active');
      e.target.getAttribute('aria-expanded') === 'false'
        ? e.target.setAttribute('aria-expanded', true)
        : e.target.setAttribute('aria-expanded', false);
    }

    dropdowns.forEach(dropdown => {
      if(dropdown.classList.contains('dropdown_active') && dropdown === currentDropdown) return;

      const dropdownBtn = dropdown.querySelector('[data-dropdown-btn]');

      dropdown.classList.remove('dropdown_active');
      dropdownBtn.setAttribute('aria-expanded', false);
    });
  };

  window.addEventListener('click', dropdownToggle);
})();
