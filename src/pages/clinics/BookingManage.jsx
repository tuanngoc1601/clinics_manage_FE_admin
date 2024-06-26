import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { bookingService } from "../../services";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";

const BookingManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const bookings = await bookingService.getBookingClinicService(
                    currentUser?.clinic_id
                );
                setData(bookings.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [currentUser?.clinic_id]);
    return (
        <div className="flex items-center justify-center gap-4 pt-6 w-full pb-6">
            <DataTable
                title={"Lịch hẹn"}
                columns={[
                    {
                        title: "Tên",
                        field: "patient_name",
                    },
                    {
                        title: "Số điện thoại",
                        field: "phone_number",
                    },
                    {
                        title: "Ngày khám",
                        field: "Doctor_Schedule.booking_date",
                    },
                    {
                        title: "Triệu chứng",
                        field: "reason",
                    },
                    {
                        title: "Giới tính",
                        field: "gender",
                    },
                    {
                        title: "Trạng thái",
                        field: "Doctor_Schedule.status.value",
                        render: (rowData) => (
                            <span
                                className={`px-2 py-0.5 rounded-md ${
                                    rowData.Doctor_Schedule.status.value ===
                                    "pendding"
                                        ? "bg-green-300"
                                        : rowData.Doctor_Schedule.status
                                              .value === "booked"
                                        ? "bg-slate-400 cursor-pointer"
                                        : "bg-orange-400 cursor-pointer"
                                }`}
                            >
                                {rowData.Doctor_Schedule.status.value}
                            </span>
                        ),
                    },
                ]}
                data={data}
                actions={[
                    (rowData) => {
                        return {
                            icon: () => (
                                <CheckIcon
                                    className={`${
                                        rowData.Doctor_Schedule.status.value !==
                                        "pendding"
                                            ? "text-gray-400"
                                            : "text-green-400"
                                    }`}
                                />
                            ),
                            tooltip: "Confirm booking",
                            disabled:
                                rowData.Doctor_Schedule.status.value !==
                                "pendding",
                            onClick: async (event, rowData) => {
                                const res =
                                    await bookingService.confirmBookingService(
                                        rowData.id
                                    );
                                if (res.status === 200) {
                                    toast.success("Confirmed booking!");
                                    const bookings =
                                        await bookingService.getBookingClinicService(
                                            currentUser?.clinic_id
                                        );
                                    setData(bookings.data.data);
                                } else {
                                    toast.error("Confirm failed!");
                                }
                            },
                        };
                    },
                    {
                        icon: () => <EditIcon className="text-orange-400" />,
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            navigate(`/manage/doctor-info/${rowData.id}`);
                        },
                    },
                    {
                        icon: () => <DeleteIcon className="text-red-400" />,
                        tooltip: "Delete Data",
                        onClick: (event, rowData) => {
                            alert("You want to delete " + rowData.id);
                        },
                    },
                ]}
            />
        </div>
    );
};

export default BookingManage;
