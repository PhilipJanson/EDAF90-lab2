import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ErrorPage from "./error";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import Index from "./index.js"

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <Index />
      },
      {
        path: "/compose-salad",
        element: <ComposeSalad />
      },
      {
        path: "/view-order/*",
        element: <ViewOrder />
        
      }
    ]
  },
]);
export default router