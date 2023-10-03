import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/login";
import RegisterPage from "./page/register";
import WelcomePage from "./page/welcome";
import NotFound from "./page/404";
import Home from "./page/home";
import { User } from "./database/user";

function App() {
  const [role, setRole] = useState(false);

  const keepLogin = () => {
    const idUser = localStorage.getItem("idUser");
    const RoleUser = User.filter((item) => item.id === +idUser).map(
      ({ password, ...user }) => user
    );
    if (RoleUser.length === 0) {
      setRole("");
    } else {
      setRole(RoleUser[0].role);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  let routing;
  if (role === "admin") {
    routing = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/Welcome" element={<WelcomePage />} />
        <Route path="/*" element={<NotFound />} />
      </>
    );
  } else {
    routing = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        {/* Redirect to LoginPage for unknown routes */}
        <Route path="/*" element={<NotFound />} />
      </>
    );
  }

  return <Routes>{routing}</Routes>;
}

export default App;
