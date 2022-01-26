export default (() => {
  let btnThemeToggle = null;
  const storageKey = 'theme-preference';

  const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
      return localStorage.getItem(storageKey);
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  };

  const theme = {
    value: getColorPreference(),
  };

  const reflectPreference = () => {
    document.firstElementChild.setAttribute('data-theme', theme.value);
  };

  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';

    setPreference();
  };

  reflectPreference();

  window.addEventListener('load', () => {
    btnThemeToggle = document.querySelector('[data-btn-theme-toggle]');
    reflectPreference();
    btnThemeToggle.addEventListener('click', toggleTheme);
  });

  const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  try {
    darkMediaQuery.addEventListener('change', ({ matches: isDark }) => {
      theme.value = isDark ? 'dark' : 'light';
      setPreference();
    });
  } catch (error) {
    try {
      darkMediaQuery.addListener(({ matches: isDark }) => {
        theme.value = isDark ? 'dark' : 'light';
        setPreference();
      });
    } catch (err) {
      console.log(err);
    }
  }
})();
