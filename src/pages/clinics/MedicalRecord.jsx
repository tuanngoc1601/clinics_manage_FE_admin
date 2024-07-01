import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingService } from "../../services";

const MedicalRecord = () => {
    const { userId } = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        (async () => {
            try {
                const userBooking = await bookingService.getUserBookingService(
                    userId
                );
                setData(userBooking.data.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [userId]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-6 w-full pb-6">
            <div className="w-full border p-4 rounded-md bg-primary">
                <h2 className="text-2xl font-semibold">Thông tin người dùng</h2>
                <div className="grid grid-cols-2 w-[60%] gap-x-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Tên:</strong> {data?.firstName}{" "}
                            {data?.lastName}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {data?.address}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> {data?.phoneNumber}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Email:</strong> {data?.email}
                        </p>
                        <p>
                            <strong>Giới tính:</strong> {data?.gender}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <h3 className="text-2xl font-semibold ps-4">Lịch sử khám</h3>
                <div className="flex flex-col gap-6 mt-6">
                    {data?.Bookings?.map((booking) => (
                        <div
                            key={booking.id}
                            className={`flex flex-col gap-2 w-full p-4 border rounded-lg ${
                                booking.Doctor_Schedule.status.value ===
                                "pendding"
                                    ? "bg-green-300"
                                    : "bg-slate-300"
                            }`}
                        >
                            <div className="flex flex-row gap-4 items-center justify-start">
                                <img
                                    src={booking.Doctor_Schedule.Doctor.image}
                                    alt=""
                                    className="w-12 h-12 rounded-full"
                                />
                                <p className="text-xl font-semibold">
                                    {booking.Doctor_Schedule.Doctor.name}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p>
                                        <strong>Ngày khám:</strong>{" "}
                                        {booking.Doctor_Schedule.booking_date}
                                    </p>
                                    <p>
                                        <strong>Ngày đặt lịch:</strong>{" "}
                                        {booking.Doctor_Schedule.createdAt}
                                    </p>
                                    <p>
                                        <strong>Tên bệnh nhân:</strong>{" "}
                                        {booking.patient_name}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <strong>Tên bác sĩ:</strong>{" "}
                                        {booking.Doctor_Schedule.Doctor.name}
                                    </p>
                                    <p>
                                        <strong>Khung giờ:</strong>{" "}
                                        {booking.Doctor_Schedule.time.value}
                                    </p>
                                    <p>
                                        <strong>Lý do khám:</strong>{" "}
                                        {booking.reason}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <strong>Trạng thái:</strong>{" "}
                                        {booking.Doctor_Schedule.status.value}
                                    </p>
                                    <p>
                                        <strong>Kết luận:</strong> Đang chuẩn
                                        đoán, đang khám bệnh
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MedicalRecord;
