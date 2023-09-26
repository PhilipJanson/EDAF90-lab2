import { useState } from 'react';
import inventory from './inventory.mjs';
import Salad from './Salad.js';

function ComposeSalad(props) {
  // Lists of all ingredients
  const foundationList = filter(props.inventory, 'foundation');
  const proteinList = filter(props.inventory, 'protein');
  const extrasList = filter(props.inventory, 'extra');
  const dressingList = filter(props.inventory, 'dressing');

  // States
  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  const [dressing, setDressing] = useState('');

  function handleSubmit(e) {
    // Prevent webpage reload
    e.preventDefault();

    // Check if all values are selected
    if (checkEmpty(foundation, protein, dressing)) {
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

    // Update salad list in App
    props.setMethod((prevState) => [...prevState, salad]);
  }

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
      <form onSubmit={handleSubmit}>
        <label>Välj Bas</label>
        <Component
          inv={props.inventory}
          options={foundationList}
          value={foundation}
          setMethod={setFoundation}
        />
        <label>Välj Protein</label>
        <Component
          inv={props.inventory}
          options={proteinList}
          value={protein}
          setMethod={setProtein}
        />
        <label>Välj Tillbehör</label>
        <Extras
          inv={props.inventory} 
          options={extrasList} 
          values={extras} 
          setMethod={setExtra} />
        <label>Välj Dressing</label>
        <Component
          inv={props.inventory}
          options={dressingList}
          value={dressing}
          setMethod={setDressing}
        />
        <input type="submit" className="btn btn-primary" value="Beställ" />
      </form>
    </div>
  );
}

function Component({ inv, options, value, setMethod }) {
  return (
    <div className="form-group pb-3 col-3">
      <select
        value={value}
        className="form-select"
        onChange={(e) => setMethod(e.target.value)}
      >
        <option disabled={true} value="">Gör ditt val</option>
        {options.map((name) => (
          <option value={name} key={name}>
            {getNameAndPrice(inv, name)}
          </option>
        ))}
      </select>
    </div>
  );
}

function Extras({ inv, options, values, setMethod }) {
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
              setMethod((prevState) => {
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

function checkEmpty(foundation, protein, dressing) {
  if (foundation === '') {
    alert("Ingen bas vald");
    return true;
  }
  if (protein === '') {
    alert("Inget protein valt");
    return true;
  }
  if (dressing === '') {
    alert("Ingen dressing vald");
    return true;
  }

  return false;
}

export default ComposeSalad;
