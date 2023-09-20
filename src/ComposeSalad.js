import { useState } from 'react';
import inventory from './inventory.mjs';
import Salad from './Salad.js';

function filter(inv, prop) {
  const res = Object.keys(inv)
    .filter((name) => inv[name][prop])
    .sort((a, b) => a.localeCompare(b, 'sv', { sensitivity: 'case' }));
  return res;
}

function ComposeSalad(props) {
  const foundationList = filter(props.inventory, 'foundation');
  const proteinList = filter(props.inventory, 'protein');
  const extrasList = filter(props.inventory, 'extra');
  const dressingList = filter(props.inventory, 'dressing');

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
  const [dressing, setDressing] = useState('');

  function handleSubmit(e) {
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

    props.onChange((prevState) => [...prevState, salad]);

    // Prevent webpage reload
    e.preventDefault();
  }

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
      <form onSubmit={handleSubmit}>
        <label>Välj Bas</label>
        <Component
          options={foundationList}
          value={foundation}
          onChange={setFoundation}
        />
        <label>Välj Protein</label>
        <Component
          options={proteinList}
          value={protein}
          onChange={setProtein}
        />
        <label>Välj Tillbehör</label>
        <Extras options={extrasList} values={extras} onChange={setExtra} />
        <label>Välj Dressing</label>
        <Component
          options={dressingList}
          value={dressing}
          onChange={setDressing}
        />
        <input type="submit" className="btn btn-primary" value="Beställ" />
      </form>
    </div>
  );
}

function Component({ options, value, onChange }) {
  return (
    <div className="form-group pb-3 col-3">
      <select
        value={value}
        className="form-select"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Extras({ options, values, onChange }) {
  return (
    <div className="row pb-3 col-12">
      {options.map((name) => (
        <div className="form-check col-3" key={name}>
          <input
            name={name}
            className="form-check-input"
            type="checkbox"
            checked={name in values}
            onChange={(e) => {
              onChange((prevState) => {
                const state = { ...prevState };

                if (e.target.checked) {
                  state[e.target.name] = true;
                } else {
                  delete state[e.target.name];
                }

                return state;
              });
            }}
          />
          <label className="form-check-label">{name}</label>
        </div>
      ))}
    </div>
  );
}

export default ComposeSalad;
