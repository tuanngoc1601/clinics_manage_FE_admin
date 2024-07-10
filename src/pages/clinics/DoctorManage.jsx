import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { doctorService } from "../../services";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paginate from "../../components/common/Paginate";

const DoctorManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [store, setStore] = useState();
    const [data, setData] = useState([]);
    // const [currentData, setCurrentData] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const indexOfLast = page * 10;
    const indexOfFirst = indexOfLast - 10;
    const currentData = data?.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        if (!searchTerm) {
            setData(store);
            return;
        }
        const doctorFilter = store?.filter((doctor) =>
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(doctorFilter);
    }, [searchTerm, setData]);

    useEffect(() => {
        (async () => {
            try {
                const doctors = await doctorService.getDoctorClinicService(
                    currentUser?.clinic_id
                );
                setData(doctors.data.data);
                setStore(doctors.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col items-start justify-center gap-6 pt-6 w-full pb-6">
            {/* <DataTable
                title={"Bác sĩ"}
                columns={[
                    {
                        title: "Ảnh",
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
                        title: "Tên",
                        field: "name",
                    },
                    {
                        title: "Email",
                        field: "email",
                    },
                    {
                        title: "Địa chỉ",
                        field: "address",
                    },
                    {
                        title: "Giới tính",
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
            /> */}
            <h2 className="text-xl font-semibold uppercase">
                Danh sách thông tin bác sĩ
            </h2>
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Nhập tên bác sĩ"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-zinc-300 rounded px-3 py-2 outline-none"
                        />
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">
                        + Thêm bác sĩ
                    </button>
                </div>
                <table className="min-w-full bg-white border border-zinc-300">
                    <thead>
                        <tr className="bg-zinc-100 text-sm">
                            <th className="border px-4 py-2">STT</th>
                            <th className="border px-8 py-2">Ảnh</th>
                            <th className="border px-4 py-2">Tên bác sĩ</th>
                            <th className="border px-2 py-2">Email</th>
                            <th className="border px-2 py-2 w-20">Địa chỉ</th>
                            <th className="border px-4 py-2 w-24 text-center">
                                Giới tính
                            </th>
                            <th className="border px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData?.map((doctor, index) => (
                            <tr key={doctor.id} className="h-16 py-2 text-sm">
                                <td className="border h-16 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-2 text-start">
                                    <img
                                        src={doctor.image}
                                        alt=""
                                        className="w-16 h-16 rounded-lg"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    {doctor.name}
                                </td>
                                <td className="border px-4 py-2">
                                    {doctor.email}
                                </td>
                                <td className="border px-4 py-2">
                                    {doctor.address}
                                </td>
                                <td className="border px-4 py-2">
                                    {doctor.gender === "male" ? "Nam" : "Nữ"}
                                </td>

                                <td className="border px-4 py-2">
                                    <button
                                        type="button"
                                        className="text-xl text-orange-400"
                                        onClick={() =>
                                            navigate(
                                                `/manage/doctor-info/${doctor.id}`
                                            )
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
                                                    doctor.id
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

export default DoctorManage;
