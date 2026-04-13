import '../../plugins/reveal.js-plugins/fullscreen/plugin.js';

const revealFullscreen =
  typeof window !== 'undefined' ? window.RevealFullscreen : undefined;

export default revealFullscreen;
