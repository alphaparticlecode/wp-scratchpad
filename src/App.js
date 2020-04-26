import React from 'react';
import Login from './Login';
import Site from './Site';
// import Draft from './Draft';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>WP Scratchpad</h1>

      <Site />

      <Login />

      {/* <Draft />*/}
    </div>
  );
}

export default App;
