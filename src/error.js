import { useRouteError } from "react-router-dom";
import { NavBar } from "./App.js"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="container py-4">
      <NavBar/>
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Oops</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
