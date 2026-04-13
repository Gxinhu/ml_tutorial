import React from 'react';
import styled from 'styled-components';
import { Deck as RevealDeck } from '@revealjs/react';
import Slides from './Slides';
import revealOptions, {
  revealPlugins,
} from './Components/RevealComponents/revealOptions';

// import './Themes/darcula.css';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './Themes/override.css';

const App = () => (
  <AppShell className="App">
    <RevealDeck config={revealOptions} plugins={revealPlugins}>
      {Slides}
    </RevealDeck>
    <Author>Hu Xin</Author>
  </AppShell>
);

const AppShell = styled.div`
  position: relative;
`;

const DecorativeBorder = () => (
  <BoxContainer>
    <DecorativeBox $bg="#44625B" />
    <DecorativeBox $bg="#EDC54D" />
    <DecorativeBox $bg="#8F1812" />
  </BoxContainer>
);

const Author = styled.h6`
  position: fixed;
  bottom: 10px;
  left: 20px;
  z-index: 30;
`;

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  justify-content: space-between;
  gap: 10px;
`;

const DecorativeBox = styled.span`
  height: 20px;
  flex-grow: 1;
  background-color: ${({ $bg }) => $bg};
`;

export default App;
