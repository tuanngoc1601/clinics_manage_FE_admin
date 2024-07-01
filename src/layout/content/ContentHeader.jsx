import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { authRequestApi } from "../../redux/requests";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ContentHeader = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleSidebar = () => {};
    const handleLogout = () => {
        authRequestApi.logoutUser(dispatch, navigate);
    };

    return (
        <div className="w-full flex flex-row justify-between items-center mt-6 py-2">
            <div className="flex flex-row items-center">
                <button
                    type="button"
                    className="flex flex-row justify-center items-center text-xl me-3"
                    onClick={() => toggleSidebar()}
                >
                    <FiMenu className="w-5" />
                </button>
                <h3 className="text-lg font-semibold text-gray-400">Trang chủ</h3>
            </div>
            <div className="flex flex-row items-center justify-end gap-x-3">
                <img
                    src={currentUser?.["Clinic.avatar"]}
                    alt=""
                    className="w-8 h-8 rounded-full object-contain border "
                />
                <span className="text-sm font-medium">{currentUser?.firstName} {currentUser?.lastName}</span>
                <button
                    className="flex flex-row items-center justify-center text-xl"
                    onClick={handleLogout}
                >
                    <IoIosLogOut />
                </button>
            </div>
        </div>
    );
};

export default ContentHeader;
