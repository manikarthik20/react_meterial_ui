import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./components/context/AuthContext";
//import Message from "./components/Message";
//import Messages from "./components/Messages";
//import Search from "./components/Search";

function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Message/>
    // </div>
  );
}

export default App;
