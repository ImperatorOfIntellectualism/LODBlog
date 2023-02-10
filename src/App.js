import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import "./style.scss"
import Register from './pages/Register';
import Header from './components/header'
import Footer from './components/footer'
import Single from './pages/Single';
import Write from './pages/Write';
import Profile from './pages/Profile';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile/>
  }
]);

function App() {
  return (
    <div className="App">
      <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
