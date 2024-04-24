import React, { useEffect, useState } from "react";
import Schedule from "../../components/Schedule";
import { useSelector } from "react-redux";
import { doctorService } from "../../services";

const ScheduleManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const doctors = await doctorService.getDoctorClinicService(
                    currentUser?.clinic_id
                );
                setData(doctors.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-6">
            {data.length > 0 &&
                data.map((doctor, index) => (
                    <Schedule key={index} id={doctor.id} />
                ))}
        </div>
    );
};

export default ScheduleManage;
