import React from 'react';
import Login from './Login';
import Site from './Site';
import Draft from './Draft';
import './App.css';

import Logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div className="container">
			<div className="logo-lockup">
				<img src={Logo} alt="WP Scratchpad Logo" className="logo"/>
				<h1 className="tagline">WP Scratchpad</h1>
			</div>
			<Login />
      </div>

      <Site />

      <Draft />
    </div>
  );
}

export default App;
