import React from "react";
import { Link } from "react-router-dom";

const TimeSchedule = ({ time }) => {
    return (
        <Link to={"/bookings/1"}>
            <div className="w-115 h-10 text-sm flex items-center justify-center font-semibold text-textColor hover:boder-2 hover:border-cyan-400 border-transparent bg-bgTimeSchedule cursor-pointer">
                {time}
            </div>
        </Link>
    );
};

export default TimeSchedule;
