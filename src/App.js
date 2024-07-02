import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthenticatedRoute,
  RedirectIfAuthenticated,
} from "./authgaurds/authguard"; // Assuming authguard.js is renamed
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Register from "./components/register/register";
import NotFound from "./components/notfound/notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Dashboard />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
