import React, { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import { useSelector } from "react-redux";
import HomePage from "./clinics/HomePage";

const Login = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    if (currentUser) return <HomePage />;

    return (
        <section className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="flex flex-row justify-center items-center pt-10">
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/10190851/Louis-Vuitton-1.png"
                            alt="logo"
                        />
                        Louis Vuitton
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Login your account
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
