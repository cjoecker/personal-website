import React from 'react';

import logo from './logo.svg';
import './App.css';

import styled from "styled-components";
import Balls from "./Skills/components/Balls";

function App() {
  return (
    <CSSVariables className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </CSSVariables>
  );
}

export default App;

export const CSSVariables = styled.div`
  --margin-s: 5px;
  --margin-m: 10px;
  --margin-l: 20px;
`;
