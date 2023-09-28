import { useOutletContext } from "react-router-dom";

function Confirm() {
  const [salads, inventory, addSalad] = useOutletContext();
  var uuid = window.location.pathname.replace("/view-order/confirm/", "");
  console.log(uuid)
  const salad = salads.find((salad) => salad.uuid === uuid);

  if (!salad) {
    return (<ViewOrder />);
  }

  return (
    <>
      <div class="alert alert-success alter-dismissable fade show" role="alert">
        En sallad har lagts till i varukorgen: {salad.getDisplayString()}
        <button type="button" class="close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ViewOrder />
    </>
  );
}

function ViewOrder() {
  const [salads, inventory, addSalad] = useOutletContext();

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
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
