import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import { Dashboard } from './Dashboard';
import './App.css';
import { AuthProvider } from './AuthContext';
import CreatePoll from './CreatePoll';
import Details from './Details';
import Navbar from './Navbar'; 

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Register />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dash',
      element: <Dashboard />,
    },
    {
      path: '/create',
      element: <CreatePoll />,
    },
    {
      path: '/poll/:id',
      element: <Details />,
    },
  ]);

  return (
    <AuthProvider>
      <Navbar />  {/* Add Navbar here */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
