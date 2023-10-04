import { useOutletContext, useParams, Outlet } from "react-router-dom";

function Confirm() {
  const salads = useOutletContext().salads;
  const uuid = useParams().uuid;
  const salad = salads.find((salad) => salad.uuid === uuid);

  if (!salad) {
    return null;
  }

  return (
    <>
      <div className="alert alert-success alter-dismissable fade show" role="alert">
        En sallad har lagts till i varukorgen: {salad.getDisplayString()}
        <button type="button" className="close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

function ViewOrder() {
  const salads = useOutletContext().salads;

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <Outlet context={{salads: salads}}></Outlet>
      <h2>Varukorgen</h2>
      <ul className="list-group">
        {salads.map((salad) => (
          <li key={salad.uuid} className="list-group-item">
            {salad.getDisplayString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ViewOrder, Confirm };
