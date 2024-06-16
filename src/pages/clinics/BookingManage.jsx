import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { bookingService } from "../../services";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

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
                    },
                ]}
                data={data}
                actions={[
                    {
                        icon: ConfirmationNumberIcon,
                        tooltip: "Confirm booking",
                        onClick: (event, rowData) => {
                            // navigate(`/manage/doctor-info/${rowData.id}`);
                            console.log(1);
                        },
                    },
                    {
                        icon: "edit",
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            navigate(`/manage/doctor-info/${rowData.id}`);
                        },
                    },
                    {
                        icon: "delete",
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
