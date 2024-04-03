import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/headers/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/clinics/HomePage";

function App() {
    const pathname = useLocation().pathname;

    return (
        <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center bg-white">
            {pathname !== "/auth/login" ? <Header /> : ""}
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route exact path="/" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default App;
