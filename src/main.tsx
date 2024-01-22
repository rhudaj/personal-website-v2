import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home, Projects, School} from "./pages/index"
import { Menu } from './components/Menu'
import './styles.css'
import { ContactMe } from './components/Contact-me';

function Main() {
  return (
    <div id="Main">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Projects' element={<Projects />}></Route>
        <Route path='/School' element={<School />}></Route>
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

const container = document.getElementById('root');
const root = createRoot(container!);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
