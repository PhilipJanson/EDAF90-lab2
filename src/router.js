import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error";
import ComposeSalad from "./ComposeSalad";
import { ViewOrder, ConfirmAlert } from "./ViewOrder";
import Index from "./index.js";

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
            element: <ConfirmAlert />,
          },
        ],
      },
    ],
  },
]);

async function inventoryLoader() {
  //new Promise((resolve) => setTimeout(resolve, 1000));
  return fetchCategory("foundations", {})
    .then((inventory) => fetchCategory("proteins", inventory))
    .then((inventory) => fetchCategory("extras", inventory))
    .then((inventory) => fetchCategory("dressings", inventory));
}

async function fetchCategory(category, inventory) {
  return safeFetchJson(`http://localhost:8080/${category}/`)
    .then((values) => {
      Promise.all(
        values.map((name) => {
          return fetchIngredient(category, name).then((ingredient) => {
            inventory[name] = ingredient;
          });
        })
      );
    })
    .then(() => inventory);
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

export default router;
