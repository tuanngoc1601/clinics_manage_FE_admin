import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/clinics/HomePage";
import Sidebar from "./layout/sidebar/Sidebar";
import ContentHeader from "./layout/content/ContentHeader";
import DoctorManage from "./pages/clinics/DoctorManage";
import UserManage from "./pages/clinics/UserManage";
import { useSelector } from "react-redux";
import ScheduleManage from "./pages/clinics/ScheduleManage";
import DoctorInfoManage from "./pages/clinics/DoctorInfoManage";
import DoctorScheduleManage from "./pages/clinics/DoctorScheduleManage";
import BookingManage from "./pages/clinics/BookingManage";
import MedicalRecord from "./pages/clinics/MedicalRecord";

function App() {
    const pathname = useLocation().pathname;
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    return (
        <div className="w-full min-h-screen h-auto flex flex-row items-center justify-start bg-white">
            {currentUser && <Sidebar />}
            <div
                className={`w-full h-screen flex flex-1 flex-col items-center justify-start mb-4 ${
                    currentUser ? "px-6 ms-260px" : ""
                }`}
            >
                {currentUser && <ContentHeader />}
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/sign-up" element={<SignUp />} />
                    <Route exact path="/" element={<HomePage />} />
                    <Route
                        exact
                        path="/manage/doctors"
                        element={<DoctorManage />}
                    />
                    <Route
                        exact
                        path="/manage/users"
                        element={<UserManage />}
                    />
                    <Route
                        exact
                        path="/manage/schedules"
                        element={<ScheduleManage />}
                    />
                    <Route
                        exact
                        path="/manage/schedules/:doctorId"
                        element={<DoctorScheduleManage />}
                    />
                    <Route
                        exact
                        path="/manage/doctor-info/:doctorId"
                        element={<DoctorInfoManage />}
                    />
                    <Route
                        exact
                        path="/manage/bookings"
                        element={<BookingManage />}
                    />
                    <Route
                        exact
                        path="/manage/medical-record/:userId"
                        element={<MedicalRecord />}
                    />
                </Routes>
            </div>
            <Toaster
                containerClassName="font-casual text-sm font-semibold"
                position="top-right"
                gutter={8}
                // toastOptions={{
                //     success: {
                //         className: "bg-green-400",
                //         style: {
                //             background: "green",
                //         },
                //     },
                //     error: {
                //         style: {
                //             background: "red",
                //         },
                //     },
                // }}
            />
        </div>
    );
}

export default App;
