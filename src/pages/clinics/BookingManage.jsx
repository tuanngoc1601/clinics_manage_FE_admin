import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { bookingService } from "../../services";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

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
                title={"Bookings"}
                columns={[
                    {
                        title: "Name",
                        field: "patient_name",
                    },
                    {
                        title: "Phone",
                        field: "phone_number",
                    },
                    {
                        title: "Date",
                        field: "Doctor_Schedule.booking_date",
                    },
                    {
                        title: "Reason",
                        field: "reason",
                    },
                    {
                        title: "Gender",
                        field: "gender",
                    },
                    {
                        title: "Status",
                        field: "Doctor_Schedule.status.value",
                        render: (rowData) => (
                            <span className="px-2 py-0.5 bg-green-300 rounded-md cursor-pointer">
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
                                <CheckIcon className="text-green-400" />
                            ),
                            tooltip: "Confirm booking",
                            disabled: rowData.Doctor_Schedule.status.value !== "pendding",
                            onClick: (event, rowData) => {
                                console.log(1);
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
