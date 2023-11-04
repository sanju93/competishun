import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Todo from './pages/Todo';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  let routes = createBrowserRouter([
    {
      path : '/',
      element : <NavBar/>,
      children : [
        {
          index : true,
          element : <SignUp/>
        },
        {
          path : 'login',
          element : <Login/>
        },
        {
          path : 'todo',
          element : <Todo/>
        }
      ]
    }
  ])
  return (
    <div className="App">
    <ToastContainer/>
    <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
