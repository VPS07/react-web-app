import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import DataTable from './components/DataTable.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import HomePage from './components/HomePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App children={<HomePage />} />,
  },
  {
    path: "/data",
    element: <App children={<DataTable />} />,
  },
  {
    path: "/transaction",
    element: <App children={<TransactionForm />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
