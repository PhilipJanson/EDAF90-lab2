import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import inventory from './inventory.mjs';

function App() {
  const [salads, setSalad] = useState([]);

  return (
    <div className="container py-4">
      <Header />
      <NavBar />
      <Outlet context={[ salads, inventory, setSalad ]} />
      <Footer />
    </div>
  );
}

function Header() { 
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  );
}

function NavBar() { 
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to="/view-order">
          Visa beställningen
        </NavLink>
      </li>
    </ul>
  );
}

function Footer() { 
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

export default App;
export { NavBar };