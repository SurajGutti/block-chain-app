import React from "react";
import HomePage from './components/home_page/home_page';
import HashPage from "./components/hash_page/hash_page";
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        {/*<Header />*/}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hashpage" component={HashPage} />
      </BrowserRouter >
  );
}

export default App;
