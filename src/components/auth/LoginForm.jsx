import React, { useState } from "react";

const LoginForm = () => {
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleOnChangeForm = (e, type) => {
        setDataForm((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dataForm);
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400"
                    placeholder="name@company.com"
                    value={dataForm.email}
                    onChange={(e) => handleOnChangeForm(e, "email")}
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    value={dataForm.password}
                    onChange={(e) => handleOnChangeForm(e, "password")}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label
                            htmlFor="remember"
                            className="text-gray-500 cursor-pointer"
                        >
                            Remember me
                        </label>
                    </div>
                </div>
                <a className="text-sm font-medium text-primary-600 hover:underline">
                    Forgot password?
                </a>
            </div>
            <button
                type="submit"
                className="w-full text-gray-900 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-60 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Login
            </button>
            <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <a
                    href="{{ route('register') }}"
                    className="font-medium text-primary-600 hover:underline"
                >
                    Sign up
                </a>
            </p>
        </form>
    );
};

export default LoginForm;
