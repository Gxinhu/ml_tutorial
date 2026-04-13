import React from 'react';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const renderMath = (math, displayMode) => ({
  __html: katex.renderToString(math, {
    displayMode,
    strict: 'ignore',
    throwOnError: false,
  }),
});

export const $ = inlineLaTeX => (
  <span dangerouslySetInnerHTML={renderMath(inlineLaTeX, false)} />
);

export const $$ = blockLaTeX => (
  <div dangerouslySetInnerHTML={renderMath(blockLaTeX, true)} />
);
