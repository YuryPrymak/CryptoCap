import { install } from 'resize-observer';

export default (() => {
  if (!window.ResizeObserver) install();
})();
