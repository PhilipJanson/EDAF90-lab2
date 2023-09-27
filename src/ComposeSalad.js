import { useState } from 'react';
import Salad from './Salad.js';
import { useOutletContext, useNavigate } from 'react-router-dom';

function ComposeSalad() {
  const [salads, inventory, addSalad] = useOutletContext();
  const navigate = useNavigate();

  // Lists of all ingredients
  const foundationList = filter(inventory, 'foundation');
  const proteinList = filter(inventory, 'protein');
  const extrasList = filter(inventory, 'extra');
  const dressingList = filter(inventory, 'dressing');

  // States
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [extras, setExtra] = useState({});
  const [dressing, setDressing] = useState('');

  function handleSubmit(e) {
    // Prevent webpage reload
    e.preventDefault();

    // Validate the form
    e.target.classList.add("was-validated");

    // Cancel order if form is invalid
    if (!e.target.checkValidity()) {
      return;
    }

    // Create new salad
    let salad = new Salad()
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);
    Object.keys(extras).forEach((name) => salad.add(name, inventory[name]));

    // Reset all values
    setFoundation('');
    setProtein('');
    setExtra({});
    setDressing('');

    // Remove was validated from form and all children
    e.target.classList.remove("was-validated");
    Array.prototype.forEach.call(e.target.children, (child) => child.classList.remove("was-validated"));

    // Update salad list in App
    addSalad((prevState) => [...prevState, salad]);
    navigate(`/view-order/confirm/${salad.uuid}`)
  }

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Välj Bas</label>
        <SaladComponent
          inv={inventory}
          options={foundationList}
          value={foundation}
          onChange={setFoundation}
        />
        <label>Välj Protein</label>
        <SaladComponent
          inv={inventory}
          options={proteinList}
          value={protein}
          onChange={setProtein}
        />
        <label>Välj Tillbehör</label>
        <Extras
          inv={inventory} 
          options={extrasList} 
          values={extras} 
          onChange={setExtra} />
        <label>Välj Dressing</label>
        <SaladComponent
          inv={inventory}
          options={dressingList}
          value={dressing}
          onChange={setDressing}
        />
        <input type="submit" className="btn btn-primary" value="Beställ" />
      </form>
    </div>
  );
}

function SaladComponent({ inv, options, value, onChange }) {
  return (
    <div className="form-group pb-3 col-3">
      <select
        value={value}
        className="form-select"
        onChange={(e) => {
          //Validate the select
          e.target.parentElement.classList.add("was-validated");
          onChange(e.target.value);
        }}
        required
      >
        <option disabled={true} value="">Gör ditt val</option>
        {options.map((name) => (
          <option value={name} key={name}>
            {getNameAndPrice(inv, name)}
          </option>
        ))}
      </select>
      <div className='valid-feedback'>
        Korrekt
      </div>
      <div className='invalid-feedback'>
        Välj en av ingredienserna
      </div>
    </div>
  );
}

function Extras({ inv, options, values, onChange }) {
  return (
    <div className="row pb-3 col-12">
      {options.map((name) => (
        <div className="form-check col-3" key={name}>
          <input
            id={name}
            name={name}
            className="form-check-input"
            type="checkbox"
            checked={name in values}
            onChange={(e) => {
              onChange((prevState) => {
                // Previous state
                const state = { ...prevState };

                // Add or delete extra
                if (e.target.checked) {
                  state[e.target.name] = true;
                } else {
                  delete state[e.target.name];
                }

                return state;
              });
            }}
          />
          <label className="form-check-label" htmlFor={name}>{getNameAndPrice(inv, name)}</label>
        </div>
      ))}
    </div>
  );
}

function filter(inv, prop) {
  const res = Object.keys(inv)
    .filter((name) => inv[name][prop])
    .sort((a, b) => a.localeCompare(b, 'sv', { sensitivity: 'case' }));
  return res;
}

function getNameAndPrice(inv, name) {
  return name + ' (' + inv[name].price + ' kr)';
}

export default ComposeSalad;
