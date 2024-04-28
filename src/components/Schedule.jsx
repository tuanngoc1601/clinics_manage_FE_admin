import React, { useEffect, useState } from "react";
import TimeSchedule from "./common/TimeSchedule";
import ReactMarkdown from "./common/ReactMarkdown";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegHandPointer } from "react-icons/fa6";
import { doctorService, scheduleService } from "../services";
import { formatDate } from "../utils/helper";
import { Link } from "react-router-dom";

const Schedule = ({ id }) => {
    const [doctorDetail, setDoctorDetail] = useState();
    const [dateSchedule, setDateSchedule] = useState(formatDate(new Date()));
    const [scheduleTimes, setScheduleTimes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await doctorService.getDoctorDetailService(id);
                setDoctorDetail(data.data.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            try {
                const schedules =
                    await scheduleService.getScheduleDoctorService(
                        id,
                        dateSchedule
                    );
                setScheduleTimes(schedules.data.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [dateSchedule]);

    return (
        <div className="w-full flex flex-col items-start justify-center py-4 border rounded-md shadow-md">
            <div className="flex flex-row w-full items-start justify-between px-4">
                <div className="flex flex-row item-start justify-start gap-x-2 px-4">
                    <img
                        src={doctorDetail?.image}
                        alt=""
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-sm">
                        <h1 className="text-27px text-black font-semibold my-2">
                            {doctorDetail?.name}
                        </h1>
                        <div className="leading-6">
                            <ReactMarkdown
                                content={doctorDetail?.description}
                            />
                        </div>
                        <p className="flex items-center justify-start text-sm text-textBooking leading-6">
                            <IoLocationSharp className="text-base" />
                            &nbsp;{doctorDetail?.address}
                        </p>
                    </div>
                </div>
                <div>
                    <Link to={`/manage/schedules/${id}`}>
                        <button className="px-4 py-2 rounded-md outline-none shadow-sm bg-cyan-300 text-md hover:opacity-80 text-gray-900">
                            Detail
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full flex flex-row divide-x mt-4">
                <div className="w-1/2 flex flex-col items-start justify-start">
                    <input
                        type="date"
                        id="schedule"
                        name="schedule"
                        value={dateSchedule}
                        max="2099-12-31"
                        onChange={(e) =>
                            setDateSchedule(formatDate(e.target.value))
                        }
                        className="px-4 py-2 border-b text-sm ms-4 text-textDate font-semibold outline-none"
                    />
                    <p className="flex flex-row items-center justify-center text-sm font-semibold px-4 mt-2 gap-x-2">
                        <span>
                            <AiOutlineSchedule className="text-lg font-semibold" />
                        </span>
                        LỊCH KHÁM
                    </p>
                    <div className="flex flex-row flex-wrap ps-4 mt-4 gap-2.5">
                        {scheduleTimes?.length > 0 ? (
                            <>
                                {scheduleTimes.map((schedule) => (
                                    <TimeSchedule
                                        key={schedule.id}
                                        time={schedule.time.value}
                                    />
                                ))}
                            </>
                        ) : (
                            <p>Không có lịch khám</p>
                        )}
                    </div>
                    <p className="flex text-xs text-textColor px-4 mt-2">
                        Chọn <FaRegHandPointer className="text-sm mx-1" /> và
                        đặt (Phí đặt lịch 0đ)
                    </p>
                </div>
                <div className="w-1/2 flex flex-col items-start justify-end">
                    <div className="w-full px-4 mt-2">
                        <p className="text-sm text-textAddress font-semibold">
                            ĐỊA CHỈ KHÁM
                        </p>
                        <p className="text-13px text-black font-semibold leading-6">
                            {doctorDetail?.Clinic?.name}
                        </p>
                        <p className="text-13px text-black font-normal leading-6">
                            {doctorDetail?.Clinic?.address}
                        </p>
                    </div>
                    <div className="w-full h-px bg-slate-300 mt-2"></div>
                    <p className="text-sm px-4 mt-4">
                        <span className="text-textAddress font-semibold">
                            GIÁ KHÁM:
                        </span>{" "}
                        <span>300.000đ - 400.000đ</span>{" "}
                        <span className="text-textPrimary cursor-pointer font-semibold">
                            Xem chi tiết
                        </span>
                    </p>
                    <p className="text-sm px-4 mt-4">
                        <span className="text-textAddress font-semibold">
                            LOẠI BẢO HIỂM ÁP DỤNG.
                        </span>{" "}
                        <span className="text-textPrimary cursor-pointer font-semibold">
                            Xem chi tiết
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
