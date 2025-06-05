import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Register from "./pages/Register";


function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        

        <Route
          path="/admin"
          element={isLoggedIn ? <AdminHome /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/admin/edit/:id"
          element={isLoggedIn ? <EditPost /> : <Navigate to="/login" replace />}
        />

        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/admin" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
