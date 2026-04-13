import RevealHighlight from 'reveal.js/plugin/highlight';
import RevealMarkdown from 'reveal.js/plugin/markdown';
import RevealNotes from 'reveal.js/plugin/notes';
import RevealSearch from 'reveal.js/plugin/search';
import RevealZoom from 'reveal.js/plugin/zoom';
import blackboardImage from '../../../plugins/reveal.js-plugins/chalkboard/img/blackboard.png';
import boardmarkerBlackImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-black.png';
import boardmarkerBlueImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-blue.png';
import boardmarkerGreenImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-green.png';
import boardmarkerOrangeImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-orange.png';
import boardmarkerPurpleImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-purple.png';
import boardmarkerRedImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-red.png';
import boardmarkerYellowImage from '../../../plugins/reveal.js-plugins/chalkboard/img/boardmarker-yellow.png';
import chalkBlueImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-blue.png';
import chalkGreenImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-green.png';
import chalkOrangeImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-orange.png';
import chalkPurpleImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-purple.png';
import chalkRedImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-red.png';
import chalkWhiteImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-white.png';
import chalkYellowImage from '../../../plugins/reveal.js-plugins/chalkboard/img/chalk-yellow.png';
import spongeImage from '../../../plugins/reveal.js-plugins/chalkboard/img/sponge.png';
import revealChalkboard from '../../Plugins/revealChalkboard';
import revealCustomControls from '../../Plugins/revealCustomControls';
import revealFullscreen from '../../Plugins/revealFullscreen';

export const revealPlugins = [
  RevealMarkdown,
  RevealHighlight,
  RevealNotes,
  RevealSearch,
  RevealZoom,
  revealCustomControls,
  revealChalkboard,
  revealFullscreen,
].filter(Boolean);

const revealConfig = {
  // Display presentation control arrows
  controls: true,

  // Help the user learn the controls by providing hints, for example by
  // bouncing the down arrow when they first encounter a vertical slide
  controlsTutorial: false,

  // Determines where controls appear, "edges" or "bottom-right"
  controlsLayout: 'bottom-right',

  // Visibility rule for backwards navigation arrows; "faded", "hidden"
  // or "visible"
  controlsBackArrows: 'faded',

  // Display a presentation progress bar
  progress: true,

  // Display the page number of the current slide
  slideNumber: 'h/v',

  // Add the current slide number to the URL hash so that reloading the
  // page/copying the URL will return you to the same slide
  hash: false,

  // Push each slide change to the browser history. Implies `hash: true`
  history: true,

  // Enable keyboard shortcuts for navigation
  keyboard: true,

  // Enable the slide overview mode
  overview: true,

  // Vertical centering of slides
  center: true,

  // Enables touch navigation on devices with touch input
  touch: true,

  // Loop the presentation
  loop: false,

  // Change the presentation direction to be RTL
  rtl: false,

  // See https://github.com/hakimel/reveal.js/#navigation-mode
  navigationMode: 'default',

  // Randomizes the order of slides each time the presentation loads
  shuffle: false,

  // Turns fragments on and off globally
  fragments: true,

  // Flags whether to include the current fragment in the URL,
  // so that reloading brings you to the same fragment position
  fragmentInURL: false,

  // Flags if the presentation is running in an embedded mode,
  // i.e. contained within a limited portion of the screen
  embedded: false,

  // Flags if we should show a help overlay when the questionmark
  // key is pressed
  help: true,

  // Flags if speaker notes should be visible to all viewers
  showNotes: false,

  // Global override for autoplaying embedded media (video/audio/iframe)
  // - null: Media will only autoplay if data-autoplay is present
  // - true: All media will autoplay, regardless of individual setting
  // - false: No media will autoplay, regardless of individual setting
  autoPlayMedia: null,

  // Global override for preloading lazy-loaded iframes
  // - null: Iframes with data-src AND data-preload will be loaded when within
  //   the viewDistance, iframes with only data-src will be loaded when visible
  // - true: All iframes with data-src will be loaded when within
  // the viewDistance
  // - false: All iframes with data-src will be loaded only when visible
  preloadIframes: null,

  // Number of milliseconds between automatically proceeding to the
  // next slide, disabled when set to 0, this value can be overwritten
  // by using a data-autoslide attribute on your slides
  autoSlide: 0,

  // Stop auto-sliding after user input
  autoSlideStoppable: true,

  // Use this method for navigation when auto-sliding
  autoSlideMethod: null,

  // Specify the average time in seconds that you think you will spend
  // presenting each slide. This is used to show a pacing timer in the
  // speaker view
  defaultTiming: 120,

  // Enable slide navigation via mouse wheel
  mouseWheel: false,

  // Hide cursor if inactive
  hideInactiveCursor: true,

  // Time before the cursor is hidden (in ms)
  hideCursorTime: 5000,

  // Hides the address bar on mobile devices
  hideAddressBar: true,

  // Opens links in an iframe preview overlay
  // Add `data-preview-link` and `data-preview-link="false"` to customise each
  // link
  // individually
  previewLinks: false,

  // Transition style
  transition: 'slide', // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: 'default', // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

  // Number of slides away from the current that are visible
  viewDistance: 2,

  // Parallax background image
  parallaxBackgroundImage: '', // e.g.
  // "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

  // Parallax background size
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

  // Number of pixels to move the parallax background per slide
  // - Calculated automatically unless specified
  // - Set to 0 to disable movement along an axis
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,

  // The display mode that will be used to show slides
  display: 'block',

  chalkboard: {
    theme: 'chalkboard',
    background: ['rgba(127,127,127,.1)', blackboardImage],
    eraser: { src: spongeImage, radius: 20 },
    boardmarkers: [
      {
        color: 'rgba(100,100,100,1)',
        cursor: `url(${boardmarkerBlackImage}), auto`,
      },
      {
        color: 'rgba(30,144,255,1)',
        cursor: `url(${boardmarkerBlueImage}), auto`,
      },
      {
        color: 'rgba(220,20,60,1)',
        cursor: `url(${boardmarkerRedImage}), auto`,
      },
      {
        color: 'rgba(50,205,50,1)',
        cursor: `url(${boardmarkerGreenImage}), auto`,
      },
      {
        color: 'rgba(255,140,0,1)',
        cursor: `url(${boardmarkerOrangeImage}), auto`,
      },
      {
        color: 'rgba(220,0,220,1)',
        cursor: `url(${boardmarkerPurpleImage}), auto`,
      },
      {
        color: 'rgba(255,220,0,1)',
        cursor: `url(${boardmarkerYellowImage}), auto`,
      },
    ],
    chalks: [
      {
        color: 'rgba(255,255,255,0.5)',
        cursor: `url(${chalkWhiteImage}), auto`,
      },
      {
        color: 'rgba(96,154,244,0.5)',
        cursor: `url(${chalkBlueImage}), auto`,
      },
      {
        color: 'rgba(237,20,28,0.5)',
        cursor: `url(${chalkRedImage}), auto`,
      },
      {
        color: 'rgba(20,237,28,0.5)',
        cursor: `url(${chalkGreenImage}), auto`,
      },
      {
        color: 'rgba(220,133,41,0.5)',
        cursor: `url(${chalkOrangeImage}), auto`,
      },
      {
        color: 'rgba(220,0,220,0.5)',
        cursor: `url(${chalkPurpleImage}), auto`,
      },
      {
        color: 'rgba(255,220,0,0.5)',
        cursor: `url(${chalkYellowImage}), auto`,
      },
    ],
  },
};

export default revealConfig;
