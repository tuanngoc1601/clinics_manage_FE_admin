import React, { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookingService } from "../../services";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditIcon from "@mui/icons-material/Edit";
import Paginate from "../../components/common/Paginate";

const UserManage = () => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const [store, setStore] = useState();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const indexOfLast = page * 10;
    const indexOfFirst = indexOfLast - 10;
    const currentData = data?.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        if (!searchTerm) {
            setData(store);
            return;
        }
        const userFilter = store?.filter((user) =>
            user.User.firstName
                .concat(` ${user.User.lastName}`)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setData(userFilter);
    }, [searchTerm, setData]);

    useEffect(() => {
        (async () => {
            try {
                const patients = await bookingService.getPatientClinicService(
                    currentUser?.clinic_id
                );
                setData(patients.data.data);
                setStore(patients.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [currentUser?.clinic_id]);
    return (
        <div className="flex flex-col items-start justify-center gap-4 pt-6 w-full pb-6">
            {/* <DataTable
                title={"Người dùng"}
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
                        title: "Số điện thoại",
                        field: "User.phoneNumber",
                    },
                    {
                        title: "Email",
                        field: "User.email",
                    },
                    {
                        title: "Giới tính",
                        field: "User.gender",
                    },
                    {
                        title: "Địa chỉ",
                        field: "User.address",
                    },
                ]}
                data={data}
                actions={[
                    {
                        icon: () => <EditIcon className="text-orange-400" />,
                        tooltip: "Edit Data",
                        onClick: (event, rowData) => {
                            navigate(
                                `/manage/medical-record/${rowData.User.id}`
                            );
                        },
                    },
                ]}
            /> */}
            <h2 className="text-xl font-semibold uppercase">
                Danh sách thông tin người dùng
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
                            <th className="border px-2 py-2">Email</th>
                            <th className="border px-4 py-2 w-24 text-center">
                                Giới tính
                            </th>
                            <th className="border px-2 py-2 w-20">Địa chỉ</th>
                            <th className="border px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData?.map((user, index) => (
                            <tr key={user.id} className="h-16 py-2 text-sm">
                                <td className="border h-16 px-4 py-2 text-center">
                                    {index + 1}
                                </td>
                                <td className="border px-4 py-2">
                                    {`${user.User.firstName} ${user.User.lastName}`}
                                </td>
                                <td className="border px-4 py-2 text-start">
                                    {user.User.phoneNumber}
                                </td>

                                <td className="border px-4 py-2">
                                    {user.User.email}
                                </td>

                                <td className="border px-4 py-2">
                                    {user.User.gender === "male" ? "Nam" : "Nữ"}
                                </td>
                                <td className="border px-4 py-2 w-64">
                                    {user.User.address}
                                </td>
                                <td className="border px-4 py-2 w-24 text-center">
                                    <button
                                        type="button"
                                        className="text-xl text-orange-400"
                                        onClick={() =>
                                            navigate(
                                                `/manage/medical-record/${user.User.id}`
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
                                                "You want to delete " + user.id
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

export default UserManage;
