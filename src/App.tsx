import React from 'react';

import logo from './logo.svg';
import './App.css';
import Balls from "./SkillsChart/components/Balls";
import LocationMap from "./Map/LocationMap";

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
        <LocationMap/>
        <Balls skills={[
          {skillName: "UX Design", level: 7, type: 'ux'},
          {skillName: "UI Design", level: 6, type: 'ux'},
          {skillName: "Adobe XD", level: 5, type: 'ux'},
          {skillName: "User Tests", level: 7, type: 'ux'}
        ]}/>
      </header>
    </div>
  );
}

export default App;
