import React from "react";
import { useSelector } from "react-redux";
import Login from "../Login";
import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";

const HomePage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    if (!currentUser) return <Login />;
    return (
        <div className="w-full mt-6">
            {/* <h1 className="text-xl font-bold text-foreground mb-4">TRANG CHỦ</h1> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg shadow-md p-4 col-span-1 md:col-span-2 flex">
                    <div className="flex-shrink-0">
                        <img
                            className="h-16 w-16 rounded-full object-contain"
                            src={currentUser?.["Clinic.avatar"]}
                            alt="User profile picture"
                        />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            {currentUser.firstName} {currentUser.lastName}
                        </h2>
                        <p className="text-muted-foreground">Mã: TK000002</p>
                        <p className="text-muted-foreground">
                            Giới tính:{" "}
                            {currentUser?.gender === "male" ? "Nam" : "Nữ"}
                        </p>
                        <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded">
                            Admin
                        </span>
                    </div>
                </div>

                <div className="bg-card rounded-lg shadow-md p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-muted-foreground">Số người dùng</h3>
                        <p className="text-foreground text-2xl font-bold">6</p>
                    </div>
                    <FaUserAlt className="w-10 h-10" />
                </div>
                <div className="bg-card rounded-lg shadow-md p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-muted-foreground">Số bác sĩ</h3>
                        <p className="text-foreground text-2xl font-bold">15</p>
                    </div>
                    <FaUserDoctor className="w-10 h-10" />
                </div>
                <div className="bg-card rounded-lg shadow-md p-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-muted-foreground">Số lịch hẹn</h3>
                        <p className="text-foreground text-2xl font-bold">87</p>
                    </div>
                    <AiFillSchedule className="w-10 h-10" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
