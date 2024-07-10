export function formatDate(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

export function convertStatusMessage(str) {
    switch (str) {
        case "pendding":
            return (
                <span className="text-white bg-orange-400 rounded-md px-1 py-1">
                    Chờ xác nhận
                </span>
            );
        case "booked":
            return (
                <span className="text-white bg-green-400 rounded-md px-1 py-1">
                    Thành công
                </span>
            );
        case "canceled":
            return (
                <span className="text-white bg-red-400 rounded-md px-1 py-1">
                    Huỷ lịch khám
                </span>
            );
        case "processing":
            return (
                <span className="text-white bg-cyan-400 rounded-md px-1 py-1">
                    Đang khám
                </span>
            );
        case "done":
            return (
                <span className="text-white bg-pink-400 rounded-md px-1 py-1">
                    Chờ kết quả
                </span>
            );
        case "closed":
            return (
                <span className="text-white bg-purple-400 rounded-md px-1 py-1">
                    Hoàn thành
                </span>
            );
        default:
            return <span className="">active</span>;
    }
}
