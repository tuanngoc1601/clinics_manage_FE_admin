import React, { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { doctorService } from "../../services";
import { useSelector } from "react-redux";

const DoctorManage = () => {
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
                                className="w-32 h-16 object-contain rounded-md"
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
                        icon: "edit",
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            alert("You want to edit " + rowData.id);
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

export default DoctorManage;
