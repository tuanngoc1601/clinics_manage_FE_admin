import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { bookingService } from "../../services";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";
import Paginate from "../../components/common/Paginate";
import { convertStatusMessage } from "../../utils/helper";

const BookingManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [store, setStore] = useState();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const indexOfLast = page * 10;
    const indexOfFirst = indexOfLast - 10;
    const currentData = data?.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        if (!searchTerm) {
            setData(store);
            return;
        }
        const bookingFilter = store?.filter((booking) =>
            booking.patient_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setData(bookingFilter);
    }, [searchTerm, setData]);

    useEffect(() => {
        (async () => {
            try {
                const bookings = await bookingService.getBookingClinicService(
                    currentUser?.clinic_id
                );
                setData(bookings.data.data);
                setStore(bookings.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [currentUser?.clinic_id]);
    return (
        <div className="flex flex-col items-start justify-center gap-4 pt-6 w-full pb-6">
            {/* <DataTable
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
            /> */}
            <h2 className="text-xl font-semibold uppercase">
                Danh sách Lịch hẹn
            </h2>
            <div className="w-full">
                <div className="flex justify-end items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Nhập tên người dùng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-zinc-300 rounded px-3 py-2 outline-none"
                        />
                    </div>
                    {/* <button className="bg-green-500 text-white px-4 py-2 rounded">
                        + Thêm bác sĩ
                    </button> */}
                </div>
                <table className="min-w-full bg-white border border-zinc-300">
                    <thead>
                        <tr className="bg-zinc-100 text-sm">
                            <th className="border px-4 py-2">STT</th>
                            <th className="border px-8 py-2">Tên</th>
                            <th className="border px-4 py-2">Số điện thoại</th>
                            <th className="border px-2 py-2">Ngày khám</th>
                            <th className="border px-2 py-2">Bác sĩ</th>
                            <th className="border px-4 py-2 w-24 text-center">
                                Giới tính
                            </th>
                            <th class="border px-4 py-2">Trạng thái</th>
                            <th className="border px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData?.map((booking, index) => (
                            <tr key={booking.id} className="h-16 py-2 text-sm">
                                <td className="border h-16 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-2 text-start">
                                    {booking.patient_name}
                                </td>
                                <td className="border px-4 py-2">
                                    {booking.phone_number}
                                </td>
                                <td className="border w-32 px-4 py-2">
                                    {booking.Doctor_Schedule.booking_date}
                                </td>
                                <td className="border px-4 py-2 w-44">
                                    {booking.Doctor_Schedule.Doctor.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {booking.gender === "male" ? "Nam" : "Nữ"}
                                </td>
                                <td className="border px-4 py-2 w-36">
                                    {convertStatusMessage(
                                        booking.Doctor_Schedule.status.value
                                    )}
                                </td>

                                <td className="border px-4 py-2 w-32 text-center">
                                    {booking.Doctor_Schedule.status.value ===
                                        "pendding" && (
                                        <button
                                            type="button"
                                            className="text-xl text-green-400 me-4"
                                            onClick={async () => {
                                                const res =
                                                    await bookingService.confirmBookingService(
                                                        booking.id
                                                    );
                                                if (res.status === 200) {
                                                    toast.success(
                                                        "Confirmed booking!"
                                                    );
                                                    const bookings =
                                                        await bookingService.getBookingClinicService(
                                                            currentUser?.clinic_id
                                                        );
                                                    setData(bookings.data.data);
                                                } else {
                                                    toast.error(
                                                        "Confirm failed!"
                                                    );
                                                }
                                            }}
                                        >
                                            <IoCheckmarkSharp />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="text-xl text-orange-400"
                                        onClick={() =>
                                            navigate(`/manage/doctor-info`)
                                        }
                                    >
                                        <MdEdit />
                                    </button>
                                    <button
                                        type="button"
                                        className="text-xl text-red-400 ms-4"
                                        onClick={() =>
                                            alert(
                                                "You want to delete " +
                                                    booking.id
                                            )
                                        }
                                    >
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginate total={data?.length} page={page} setPage={setPage} />
            </div>
        </div>
    );
};

export default BookingManage;
