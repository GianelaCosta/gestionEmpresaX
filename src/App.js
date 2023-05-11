import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import Products from "./pages/Products";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
