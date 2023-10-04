import React from 'react';
import './App.css';
import Stats from './components/Stats';
import ChartTwo from './components/ChartTwo';
import ChartOne from './components/ChartOne';



function App() {
  return (
    <div className="App">
      <Stats/>
      <ChartTwo/>
      <ChartOne/>
    </div>
  );
}

export default App;