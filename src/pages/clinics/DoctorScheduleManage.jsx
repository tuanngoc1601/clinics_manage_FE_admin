import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegHandPointer } from "react-icons/fa6";
import TimeSchedule from "../../components/common/TimeSchedule";
import { formatDate } from "../../utils/helper";
import { doctorService, scheduleService } from "../../services";
import ReactMarkdown from "../../components/common/ReactMarkdown";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const DoctorScheduleManage = () => {
    const { doctorId } = useParams();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [doctorDetail, setDoctorDetail] = useState();
    const [dateSchedule, setDateSchedule] = useState(formatDate(new Date()));
    const [scheduleTimes, setScheduleTimes] = useState([]);
    const [timeCode, setTimeCode] = useState([]);
    const [addCheckedState, setAddCheckedState] = useState([]);
    const [deleteCheckedState, setDeleteCheckedState] = useState([]);

    const getListTimes = () => {
        const times = [];
        scheduleTimes?.forEach((time) => {
            times.push(time.time.id);
        });
        return times;
    };

    const handleOnChange = (position, type) => {
        if (type === "add") {
            const updateCheckedState = addCheckedState.map((item, index) =>
                index === position ? !item : item
            );
            setAddCheckedState(updateCheckedState);
        } else {
            const updateCheckedState = deleteCheckedState.map((item, index) =>
                index === position ? !item : item
            );
            setDeleteCheckedState(updateCheckedState);
        }
    };

    const addTimeSchedule = async (event) => {
        event.preventDefault();
        const times = [];
        addCheckedState.forEach((state, index) => {
            if (state === true) times.push(index + 1);
        });
        if (!times.length) {
            toast.error("Something went wrong!", {
                duration: 4000,
                className: "bg-green-300 text-orange-600",
            });
        }
        const data = {
            clinic_id: currentUser?.clinic_id,
            doctor_id: doctorId,
            times: times,
            booking_date: dateSchedule,
        };

        const response = await scheduleService.createTimeScheduleService(data);

        setAddCheckedState(new Array(timeCode.length).fill(false));
        if (!response) {
            toast.error("Add schedule time failed!");
        }

        const schedules = await scheduleService.getScheduleDoctorService(
            doctorId,
            dateSchedule
        );
        setScheduleTimes(schedules.data.data);

        toast.success("Added schedule time successfully!");
    };

    const deteleTimeSchedule = async (event) => {
        event.preventDefault();
        const times = [];
        deleteCheckedState.forEach((state, index) => {
            if (state === true) times.push(index + 1);
        });
        if (!times.length) {
            toast.error("Something went wrong!", {
                duration: 4000,
                className: " bg-green-300 text-orange-600",
            });
        }
        const data = {
            clinic_id: currentUser?.clinic_id,
            doctor_id: doctorId,
            times: times,
            booking_date: dateSchedule,
        };

        const response = await scheduleService.deleteTimeScheduleService(data);
        setDeleteCheckedState(new Array(timeCode.length).fill(false));

        if (!response) {
            toast.error("Delete schedule time failed!");
        }

        const schedules = await scheduleService.getScheduleDoctorService(
            doctorId,
            dateSchedule
        );
        setScheduleTimes(schedules.data.data);

        toast.success("Deleted schedule time successfully!");
    };

    useEffect(() => {
        setAddCheckedState(new Array(timeCode.length).fill(false));
        setDeleteCheckedState(new Array(timeCode.length).fill(false));
    }, [timeCode]);

    const listTimes = getListTimes();

    useEffect(() => {
        (async () => {
            try {
                const data = await doctorService.getDoctorDetailService(
                    doctorId
                );
                const schedules =
                    await scheduleService.getScheduleDoctorService(
                        doctorId,
                        dateSchedule
                    );
                const times = await scheduleService.getAllTimeCodeService();
                setDoctorDetail(data.data.data);
                setScheduleTimes(schedules.data.data);
                setTimeCode(times.data.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [doctorId, dateSchedule]);

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
            <div className="w-full mt-4 px-4 ">
                <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="w-full flex flex-col items-end justify-center gap-4 px-4 py-4">
                <form
                    onSubmit={addTimeSchedule}
                    className="flex flex-col items-end justify-center"
                >
                    <button
                        type="submit"
                        className="px-4 py-2 rounded outline-none bg-green-300"
                    >
                        Thêm
                    </button>
                    <div className="grid grid-cols-2 gap-4 divide-x w-full">
                        <div className="flex flex-col">
                            <h3 className="text-center text-base font-semibold">
                                Buổi sáng
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center w-full mt-4">
                                {timeCode
                                    ?.filter((time) => time.id <= 8)
                                    .map((code) => (
                                        <div
                                            className={`p-0.5 ${
                                                addCheckedState[code.id - 1]
                                                    ? "bg-green-300"
                                                    : ""
                                            }`}
                                            key={code.id}
                                        >
                                            <input
                                                type="checkbox"
                                                name="add"
                                                id={`add-${code.id}`}
                                                hidden
                                                onChange={() =>
                                                    handleOnChange(
                                                        code.id - 1,
                                                        "add"
                                                    )
                                                }
                                                checked={
                                                    addCheckedState[code.id - 1]
                                                }
                                                disabled={listTimes.includes(code.id)}
                                            />
                                            <label
                                                htmlFor={`add-${code.id}`}
                                                className="w-115 h-10 text-sm flex items-center justify-center font-semibold text-textColor hover:boder-2 hover:border-cyan-400 border-transparent bg-bgTimeSchedule cursor-pointer"
                                            >
                                                {code.value}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-center text-base font-semibold">
                                Buổi chiều
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center w-full mt-4">
                                {timeCode
                                    ?.filter((time) => time.id > 8)
                                    .map((code) => (
                                        <div
                                            className={`p-0.5 ${
                                                addCheckedState[code.id - 1]
                                                    ? "bg-green-300"
                                                    : ""
                                            }`}
                                            key={code.id}
                                        >
                                            <input
                                                type="checkbox"
                                                name="add"
                                                id={`add-${code.id}`}
                                                hidden
                                                onChange={() =>
                                                    handleOnChange(
                                                        code.id - 1,
                                                        "add"
                                                    )
                                                }
                                                checked={
                                                    addCheckedState[code.id - 1]
                                                }
                                                disabled={listTimes.includes(code.id)}
                                            />
                                            <label
                                                htmlFor={`add-${code.id}`}
                                                className="w-115 h-10 text-sm flex items-center justify-center font-semibold text-textColor hover:boder-2 hover:border-cyan-400 border-transparent bg-bgTimeSchedule cursor-pointer"
                                            >
                                                {code.value}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full mt-4 px-4 ">
                <div className="w-full h-px bg-slate-300"></div>
            </div>
            <div className="w-full flex flex-col items-end justify-center gap-4 px-4 py-4">
                <form
                    onSubmit={deteleTimeSchedule}
                    className="flex flex-col items-end justify-center"
                >
                    <button className="px-4 py-2 rounded outline-none bg-red-300">
                        Xoá
                    </button>
                    <div className="grid grid-cols-2 gap-4 divide-x w-full">
                        <div className="flex flex-col">
                            <h3 className="text-center text-base font-semibold">
                                Buổi sáng
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center w-full mt-4">
                                {timeCode
                                    ?.filter((time) => time.id <= 8)
                                    .map((code) => (
                                        <div
                                            className={`p-0.5 ${
                                                deleteCheckedState[code.id - 1]
                                                    ? "bg-red-300"
                                                    : ""
                                            }`}
                                            key={code.id}
                                        >
                                            <input
                                                type="checkbox"
                                                name="delete"
                                                id={`delete-${code.id}`}
                                                hidden
                                                onChange={() =>
                                                    handleOnChange(
                                                        code.id - 1,
                                                        "delete"
                                                    )
                                                }
                                                checked={
                                                    deleteCheckedState[
                                                        code.id - 1
                                                    ]
                                                }
                                                disabled={!listTimes.includes(code.id)}
                                            />
                                            <label
                                                htmlFor={`delete-${code.id}`}
                                                className="w-115 h-10 text-sm flex items-center justify-center font-semibold text-textColor hover:boder-2 hover:border-cyan-400 border-transparent bg-bgTimeSchedule cursor-pointer"
                                            >
                                                {code.value}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-center text-base font-semibold">
                                Buổi chiều
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center w-full mt-4">
                                {timeCode
                                    ?.filter((time) => time.id > 8)
                                    .map((code) => (
                                        <div
                                            className={`p-0.5 ${
                                                deleteCheckedState[code.id - 1]
                                                    ? "bg-red-300"
                                                    : ""
                                            }`}
                                            key={code.id}
                                        >
                                            <input
                                                type="checkbox"
                                                name="delete"
                                                id={`delete-${code.id}`}
                                                hidden
                                                onChange={() =>
                                                    handleOnChange(
                                                        code.id - 1,
                                                        "delete"
                                                    )
                                                }
                                                checked={
                                                    deleteCheckedState[
                                                        code.id - 1
                                                    ]
                                                }
                                                disabled={!listTimes.includes(code.id)}
                                            />
                                            <label
                                                htmlFor={`delete-${code.id}`}
                                                className="w-115 h-10 text-sm flex items-center justify-center font-semibold text-textColor hover:boder-2 hover:border-cyan-400 border-transparent bg-bgTimeSchedule cursor-pointer"
                                            >
                                                {code.value}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorScheduleManage;
