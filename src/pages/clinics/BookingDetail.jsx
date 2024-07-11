import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingService } from "../../services";
import { convertStatusMessage } from "../../utils/helper";

const BookingDetail = () => {
    const { bookingId } = useParams();
    const [bookingDetail, setBookingDetail] = useState();
    useEffect(() => {
        (async () => {
            try {
                const res = await bookingService.getBookingDetailService(
                    bookingId
                );
                setBookingDetail(res.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [bookingId]);
    console.log(bookingDetail);
    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-6 w-full pb-6">
            <div className="w-full border p-4 rounded-md bg-primary">
                <h2 className="text-2xl font-semibold">Thông tin lịch hẹn</h2>
                <div className="grid grid-cols-2 w-[60%] gap-x-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Tên bệnh nhân:</strong>{" "}
                            {bookingDetail?.patient_name}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {bookingDetail?.address}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong>{" "}
                            {bookingDetail?.phone_number}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>
                            <strong>Email:</strong> {bookingDetail?.User?.email}
                        </p>
                        <p>
                            <strong>Giới tính:</strong>{" "}
                            {bookingDetail?.gender === "male" ? "Nam" : "Nữ"}
                        </p>
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-2 w-full p-4 border rounded-lg mt-4`}
                >
                    <div className="flex flex-row gap-4 items-center justify-start">
                        <img
                            src={bookingDetail?.Doctor_Schedule?.Doctor?.image}
                            alt=""
                            className="w-12 h-12 rounded-full"
                        />
                        <p className="text-xl font-semibold">
                            {bookingDetail?.Doctor_Schedule?.Doctor?.name}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p>
                                <strong>Ngày khám:</strong>{" "}
                                {bookingDetail?.Doctor_Schedule?.booking_date}
                            </p>
                            <p>
                                <strong>Ngày đặt lịch:</strong>{" "}
                                {bookingDetail?.Doctor_Schedule?.createdAt}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Tên bác sĩ:</strong>{" "}
                                {bookingDetail?.Doctor_Schedule?.Doctor.name}
                            </p>
                            <p>
                                <strong>Khung giờ:</strong>{" "}
                                {bookingDetail?.Doctor_Schedule?.time?.value}
                            </p>
                            <p>
                                <strong>Lý do khám:</strong>{" "}
                                {bookingDetail?.reason}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Trạng thái:</strong>{" "}
                                {convertStatusMessage(
                                    bookingDetail?.Doctor_Schedule?.status?.value
                                )}
                            </p>
                            <p>
                                <strong>Kết luận:</strong> Đang chuẩn đoán, đang
                                khám bệnh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
