import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import ComposeSalad from "./ComposeSalad";
import { ViewOrder, Confirm } from "./ViewOrder";
import Index from "./index.js";
import inventory from "./inventory.mjs";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/compose-salad",
        loader: inventoryLoader,
        element: <ComposeSalad />,
      },
      {
        path: "/view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "confirm/:uuid",
            element: <Confirm />,
          },
        ],
      },
    ],
  },
]);

async function inventoryLoader() {
  const inventory = {};

  await Promise.all([
    new Promise((resolve) => setTimeout(resolve, 0)),
    fetchCategory("foundations", inventory),
    fetchCategory("proteins", inventory),
    fetchCategory("extras", inventory),
    fetchCategory("dressings", inventory),
  ]);

  return inventory;
}

async function fetchCategory(category, inventory) {
  return safeFetchJson(`http://localhost:8080/${category}/`).then((values) => {
    values.forEach((name) => {
      fetchIngredient(category, name).then((ingredient) => {
        inventory[name] = ingredient;
      });
    });
  });
}

async function fetchIngredient(category, ingredient) {
  const url = `http://localhost:8080/${category}/${ingredient}`;
  return safeFetchJson(url);
}

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

/*
  await fetchFoundations().then((foundations) =>
    Array.prototype.forEach.call(foundations, (foundation) => {
      fetchIngredient(foundation).then((ingredient) => {
        console.log(foundation);
        console.log(ingredient);
        inventory[foundation] = ingredient;
      });
    })
  );
*/

export default router;
