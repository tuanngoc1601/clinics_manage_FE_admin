import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doctorService } from "../../services";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toast from "react-hot-toast";

const DoctorInfoManage = () => {
    const { doctorId } = useParams();
    const [doctorInfo, setDoctorInfo] = useState({});

    const onChangeData = (e, type) => {
        setDoctorInfo((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }));
    };

    const updateDoctorInfo = async () => {
        const res = await doctorService.updateDoctorInfoService(doctorId, {
            email: doctorInfo.email,
            name: doctorInfo.name,
            address: doctorInfo.address,
            description: doctorInfo.description,
            introduction: doctorInfo.introduction,
        });
        toast.success("Doctor information updated successfully!", {
            duration: 4000,
            className: "bg-green-300 text-orange-600"
        });
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await doctorService.getDoctorDetailService(
                    doctorId
                );
                setDoctorInfo(res.data.data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [doctorId]);

    return (
        <div className="flex items-center justify-center gap-4 pt-6 w-full pb-6">
            <div className="w-full grid grid-cols-2lg gap-x-2">
                <div className="flex flex-col items-center justify-center gap-y-2 p-4 border shadow-md rounded-md max-h-72">
                    <img
                        src={doctorInfo?.image}
                        alt=""
                        className="w-28 h-28 object-cover rounded-full"
                    />
                    <h2 className="text-lg font-semibold text-center">
                        {doctorInfo?.name}
                    </h2>
                    <h3 className="text-md font-normal">
                        {doctorInfo?.Clinic?.name}
                    </h3>
                </div>
                <div className="w-full p-4 border shadow-md rounded-md flex flex-col gap-y-2 flex-none">
                    <div className="grid grid-cols-3lg items-center justify-start w-full gap-x-4">
                        <label className="font-semibold">Email: </label>
                        <input
                            type="email"
                            name="email"
                            value={doctorInfo?.email}
                            onChange={(e) => onChangeData(e, "email")}
                            className="border outline-none px-4 py-1 w-full rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-3lg items-center justify-start w-full gap-x-4">
                        <label className="font-semibold">Tên: </label>
                        <input
                            type="text"
                            name="name"
                            value={doctorInfo?.name}
                            onChange={(e) => onChangeData(e, "name")}
                            className="border outline-none px-4 py-1 w-full rounded-md"
                        />
                    </div>
                    <div className="grid grid-cols-3lg items-center justify-start w-full gap-x-4">
                        <label className="font-semibold">Địa chỉ: </label>
                        <input
                            type="text"
                            name="address"
                            value={doctorInfo?.address}
                            onChange={(e) => onChangeData(e, "address")}
                            className="border outline-none px-4 py-1 w-full rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-y-1">
                        <label className="font-semibold">Mô tả: </label>
                        <div className="w-full">
                            <CKEditor
                                editor={ClassicEditor}
                                data={doctorInfo?.description}
                                onChange={(event, editor) => {
                                    setDoctorInfo((prevState) => ({
                                        ...prevState,
                                        description: editor.getData(),
                                    }));
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-y-1">
                        <label className="font-semibold">Giới thiệu: </label>
                        <div className="w-full doctor-introduction">
                            <CKEditor
                                editor={ClassicEditor}
                                data={doctorInfo?.introduction}
                                onChange={(event, editor) => {
                                    setDoctorInfo((prevState) => ({
                                        ...prevState,
                                        introduction: editor.getData(),
                                    }));
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-end">
                        <button
                            className="px-4 py-2 rounded-md shadow-sm bg-orange-300 hover:opacity-80"
                            onClick={updateDoctorInfo}
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorInfoManage;
