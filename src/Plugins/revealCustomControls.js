import '../../plugins/reveal.js-plugins/customcontrols/plugin.js';
import '../../plugins/reveal.js-plugins/customcontrols/style.css';

const revealCustomControls =
  typeof window !== 'undefined' ? window.RevealCustomControls : undefined;

export default revealCustomControls;
