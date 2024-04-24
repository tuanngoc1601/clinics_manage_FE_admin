import React from "react";
import { useParams } from "react-router-dom";

const ScheduleDetailManage = () => {
    const { doctorId } = useParams();
    console.log(doctorId);
    return <div className="flex items-center justify-center gap-4 pt-6 w-full pb-6">
        {doctorId}
    </div>;
};

export default ScheduleDetailManage;
