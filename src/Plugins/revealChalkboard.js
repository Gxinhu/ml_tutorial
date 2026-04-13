import '../../plugins/reveal.js-plugins/chalkboard/plugin.js';
import '../../plugins/reveal.js-plugins/chalkboard/style.css';

const revealChalkboard =
  typeof window !== 'undefined' ? window.RevealChalkboard : undefined;

export default revealChalkboard;
