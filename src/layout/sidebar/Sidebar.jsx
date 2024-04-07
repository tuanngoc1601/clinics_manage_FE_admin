import React from "react";
import { NavLink } from "react-router-dom";
import { navigationLinks } from "../../utils/navigation";
import { navLinkStyle } from "../../utils/active";

const Sidebar = () => {
    return (
        <div className="bg-slate-500 w-260 flex-none min-h-screen py-9 px-5">
            <div className="flex flex-row justify-start items-center gap-x-4">
                <div className="w-12 h-12 overflow-hidden rounded-full shadow-sm">
                    <img
                        src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                        alt="profile image"
                    />
                </div>
                <span className="font-medium text-xl text-black uppercase">
                    alice-doe
                </span>
            </div>
            <div className="w-full mt-7 h-auto">
                <ul className="w-full h-full">
                    {navigationLinks.map((navLink) => (
                        <li className="mb-2.5 me-1" key={navLink.id}>
                            <NavLink
                                to={navLink.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? `${navLinkStyle} text-white`
                                        : navLinkStyle
                                }
                                end
                            >
                                {navLink.image}
                                <span className="capitalize text-base">
                                    {navLink.title}
                                </span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
