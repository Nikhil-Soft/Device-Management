import React from 'react';
import DeviceList from './components/DeviceList';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="title"> Edge Device Registry Dashboard </h1>
      <DeviceList />
    </div>
  );
}

export default App;

