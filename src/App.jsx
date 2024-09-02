import "./App.css";
import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Config/ProtectedRoute";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
