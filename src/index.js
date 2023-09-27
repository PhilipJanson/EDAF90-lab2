import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default function Index() {
  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välkommen</h2>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
