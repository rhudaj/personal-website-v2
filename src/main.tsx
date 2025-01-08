// STYLES
import './styles.sass'
import 'react-lazy-load-image-component/src/effects/blur.css' // for blurring effect css
// Other Imports
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'; // replaced BrowserRouter w' HashRouter
import { Home, Projects, School, Art } from "./pages/index"
import { Menu } from './components/menu/menu'
import { ContactMe } from './components/contactMe/contact-me';

// Main:
function Main() {
  // Scroll to top anytime page changes
  const active_page = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active_page]);

  return (
    <div id="Main">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/school' element={<School/>}></Route>
        <Route path='/art' element={<Art/>}></Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div id='App'>
      <Menu/>
      <Main/>
      <ContactMe/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);