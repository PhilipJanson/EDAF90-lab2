import { v4 as uuidv4 } from 'uuid';

class Salad {
  static instanceCounter = 0;

  constructor(copy) {
    if (copy) {
      this.ingredients = {
        ...copy.ingredients,
      };
    } else {
      this.ingredients = {};
    }

    this.id = 'salad_' + Salad.instanceCounter++;
    this.uuid = uuidv4();
  }

  add(name, properties) {
    this.ingredients[name] = properties;
    return this;
  }

  getPrice() {
    return Object.values(this.ingredients)
      .map((ingedient) => parseFloat(ingedient.price))
      .reduce((prev, ingedient) => prev + ingedient);
  }

  count(prop) {
    return Object.values(this.ingredients).filter((a) => a[prop]).length;
  }

  getDisplayString() {
    return Object.keys(this.ingredients)
    .sort((a, b) => a.localeCompare(b, 'sv', { sensitivity: 'case' }))
    .reduce((a, b) => a + ', ' + b) + ', pris: ' + this.getPrice() + ' kr';
  }

  static parse(json) {
    const data = JSON.parse(json);

    if (Array.isArray(data)) {
      return data.map((a) => new Salad(a));
    }

    return new Salad(data);
  }
}

export default Salad;
