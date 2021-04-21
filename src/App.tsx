import React from 'react';

import logo from './logo.svg';
import './App.css';
import SkillsMap from "./SkillsChart/SkillsMap";

function App() {
  return (
    <div className="App">
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
        <SkillsMap skills={[
          {skillName: "UX Design", level: 7},
          {skillName: "UI Design", level: 6},
          {skillName: "Adobe XD", level: 5},
          {skillName: "User Tests", level: 7}
        ]}/>
      </header>
    </div>
  );
}

export default App;
