function ViewOrder(props) {
  const salads = props.salads;

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Varukorgen</h2>
      <ul className="list-group">
        {salads.map((salad) => (
          <li key={salad.uuid} className="list-group-item">{salad.getDisplayString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewOrder;
