import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Projects, School, Art } from "./pages/index"
import { Menu } from './components/Menu'
import { ContactMe } from './components/Contact-me';
import './styles.css'

function Main() {
  return (
    <div id="Main">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Projects' element={<Projects/>}></Route>
        <Route path='/School' element={<School/>}></Route>
        <Route path='/Art' element={<Art/>}></Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div id='App'>
      <Menu />
      <Main />
      <ContactMe/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);