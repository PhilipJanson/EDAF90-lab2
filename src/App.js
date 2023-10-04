import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import inventory from "./inventory.mjs";

function App() {
  const [salads, setSalad] = useState([]);

  const isLoading = useNavigation().state === 'loading';
  //console.log(isLoading)
  const element = isLoading ? <BootstrapSpinner/>: <Outlet context={[salads, inventory, setSalad]} />;

  return (
    <div className="container py-4">
      <Header />
      <NavBar />
      {element}
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

function BootstrapSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default App;
export { NavBar };
