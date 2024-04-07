import { IoHome } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import { FaAddressBook } from "react-icons/fa";

export const navigationLinks = [
    { id: 1, title: "Home", path: "/", image: <IoHome /> },
    { id: 2, title: "Users", path: "/manage/users", image: <FaUsers /> },
    { id: 3, title: "Doctors", path: "/manage/doctors", image: <FaUserDoctor /> },
    { id: 4, title: "Schedules", path: "/manage/schedules", image: <GrSchedule /> },
    { id: 5, title: "Booking", path: "/manage/booking", image: <FaAddressBook /> },
];
