function ViewOrder(props) {
  const salads = props.salads;

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      {salads.map((salad) => (
        <span>{JSON.stringify(salad)}</span>
      ))}
    </div>
  );
}

export default ViewOrder;
