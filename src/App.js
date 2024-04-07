import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/clinics/HomePage";
import Sidebar from "./layout/sidebar/Sidebar";
import ContentHeader from "./layout/content/ContentHeader";
import DoctorManage from "./pages/clinics/DoctorManage";

function App() {
    const pathname = useLocation().pathname;

    return (
        <div className="w-full min-h-screen h-auto flex flex-row items-center justify-start bg-white">
            {pathname !== "/auth/login" ? <Sidebar /> : ""}
            <div className="w-full min-h-screen h-auto flex flex-1 flex-col items-center justify-start px-6">
                {pathname !== "/auth/login" ? <ContentHeader /> : ""}
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/sign-up" element={<SignUp />} />
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/manage/doctors" element={<DoctorManage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
