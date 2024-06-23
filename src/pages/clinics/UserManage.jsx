import React, { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookingService } from "../../services";
import EditIcon from "@mui/icons-material/Edit";

const UserManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                const patients = await bookingService.getPatientClinicService(
                    currentUser?.clinic_id
                );
                setData(patients.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [currentUser?.clinic_id]);
    return (
        <div className="flex items-center justify-center gap-4 pt-6 w-full pb-6">
            <DataTable
                title={"Patients"}
                columns={[
                    {
                        title: "First Name",
                        field: "User.firstName",
                    },
                    {
                        title: "Last Name",
                        field: "User.lastName",
                    },
                    {
                        title: "Phone Number",
                        field: "User.phoneNumber",
                    },
                    {
                        title: "Email",
                        field: "User.email",
                    },
                    {
                        title: "Gender",
                        field: "User.gender",
                    },
                    {
                        title: "Address",
                        field: "User.address",
                    },
                ]}
                data={data}
                actions={[
                    {
                        icon: () => <EditIcon className="text-orange-400" />,
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            navigate(`/manage/doctor-info/${rowData.id}`);
                        },
                    },
                ]}
            />
        </div>
    );
};

export default UserManage;
