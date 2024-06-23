import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { doctorService } from "../../services";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DoctorManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
        <div className="flex items-center justify-center gap-4 pt-6 w-full pb-6">
            <DataTable
                title={"Doctors"}
                columns={[
                    {
                        title: "Image",
                        field: "image",
                        render: (rowData) => (
                            <img
                                src={rowData.image}
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    borderRadius: "8px",
                                }}
                            />
                        ),
                    },
                    {
                        title: "Name",
                        field: "name",
                    },
                    {
                        title: "Email",
                        field: "email",
                    },
                    {
                        title: "Address",
                        field: "address",
                    },
                    {
                        title: "Gender",
                        field: "gender",
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

export default DoctorManage;
