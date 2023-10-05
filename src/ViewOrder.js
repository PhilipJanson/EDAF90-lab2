import { useState } from "react";
import { useOutletContext, useParams, Outlet } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

function ViewOrder() {
  const salads = useOutletContext().salads;
  const addSalad = useOutletContext().addSalad;
  const [responseData, setResponseData] = useState({});
  const [show, toggle] = useState(false);

  async function handleSubmit() {
    const data = [];
    salads.forEach((salad) => data.push(Object.keys(salad.ingredients)));

    if (data.length === 0) {
      return null;
    }

    await fetch("http://localhost:8080/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        setResponseData(json);
        toggle(true);
        addSalad([]);
      });
  }

  return (
    <>
      <div className="row h-200 p-5 bg-light border rounded-3">
        <Outlet context={{ salads: salads }}></Outlet>
        <h2>Varukorg</h2>
        <ul className="list-group">
          {salads.map((salad) => (
            <li key={salad.uuid} className="list-group-item">
              {salad.getDisplayString()}
            </li>
          ))}
        </ul>
        <div className="container text-center p-3">
          <button onClick={handleSubmit} className="btn btn-primary">
            Beställ
          </button>
        </div>
      </div>
      <OrderToast responseData={responseData} show={show} toggle={toggle} />
    </>
  );
}

function OrderToast({ responseData, show, toggle }) {
  if (JSON.stringify(responseData) === "{}") {
    return null;
  }

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <Toast
        show={show}
        onClose={() => {
          toggle(!show);
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Order placerad</strong>
          <small>{responseData.timestamp}</small>
        </Toast.Header>
        <Toast.Body>
          <small>Status: {responseData.status}</small>
          <br />
          <small>Ordernummer: {responseData.uuid}</small>
          <br />
          <small>Antal sallader: {responseData.order.length}</small>
          <br />
          <small>Pris: {responseData.price} kr</small>
        </Toast.Body>
      </Toast>
    </div>
  );
}

function ConfirmAlert() {
  const salads = useOutletContext().salads;
  const uuid = useParams().uuid;
  const salad = salads.find((salad) => salad.uuid === uuid);

  if (!salad) {
    return null;
  }

  return (
    <>
      <div
        className="alert alert-success alter-dismissable fade show"
        role="alert"
      >
        En sallad har lagts till i varukorgen: {salad.getDisplayString()}
        <button type="button" className="close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
}

export { ViewOrder, ConfirmAlert };
