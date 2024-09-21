import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PayingPage from './pages/PayingPage';
import MainPage from './pages/MainPage';
import ChartPage from './pages/ChartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/paying',
    element: <PayingPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  },
  {
    path: '/chart',
    element: <ChartPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
