import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/Home/Home.jsx';
import Analyze from './pages/Analyze/Analyze.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Layout from './pages/Layout.jsx';
import MappoolSelection from './pages/Analyze/MappoolSelection.jsx';
import Individual from './pages/Analyze/Individual.jsx';

import './styles/default.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />},
      { 
        path: "analyze",
        element: <Analyze />,
        children: [
          {index: true, element: <MappoolSelection />},
          {path: "individual", element: <Individual />} 
        ]
      }
    ],
    errorElement: <ErrorPage /> // Errorpage wip
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
