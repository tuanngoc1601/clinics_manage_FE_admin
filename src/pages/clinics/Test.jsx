import React from "react";

const Test = () => {
    return (
        <div class="w-full">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Nhập tên bệnh nhân"
                        class="border border-zinc-300 rounded px-3 py-2"
                    />
                    <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                        Tìm kiếm
                    </button>
                </div>
                <button class="bg-green-500 text-white px-4 py-2 rounded">
                    + Thêm giấy khám bệnh
                </button>
            </div>
            <table class="min-w-full bg-white border border-zinc-300">
                <thead>
                    <tr class="bg-zinc-100">
                        <th class="border px-4 py-2">STT</th>
                        {/* <th class="border px-4 py-2">Mã</th> */}
                        <th class="border px-4 py-2">Tên bệnh nhân</th>
                        <th class="border px-4 py-2">Tiêu đề</th>
                        {/* <th class="border px-4 py-2">Phòng khám</th> */}
                        <th class="border px-4 py-2">Bác sĩ</th>
                        <th class="border px-4 py-2">Ngày</th>
                        <th class="border px-4 py-2">Trạng thái</th>
                        {/* <th class="border px-4 py-2">Thanh toán</th> */}
                        <th class="border px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border px-4 py-2 text-center">1</td>
                        {/* <td class="border px-4 py-2">GKB000021</td> */}
                        <td class="border px-4 py-2">Nguyễn Minh Quân</td>
                        <td class="border px-4 py-2">Khám thần kinh</td>
                        {/* <td class="border px-4 py-2">Phòng khám thần kinh</td> */}
                        <td class="border px-4 py-2">Trần Thị Yến Nhi</td>
                        <td class="border px-4 py-2">09-01-2022</td>
                        <td class="border px-4 py-2">
                            <span class="bg-red-500 text-white px-2 py-1 rounded">
                                Đợi kết quả
                            </span>
                        </td>
                        {/* <td class="border px-4 py-2">
                            <span class="bg-green-500 text-white px-2 py-1 rounded">
                                Đã thanh toán
                            </span>
                        </td> */}
                        <td class="border px-4 py-2 flex space-x-2 justify-center">
                            {/* <button>
                                <img
                                    aria-hidden="true"
                                    alt="view"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=👁️"
                                />
                            </button> */}
                            <button>
                                <img
                                    aria-hidden="true"
                                    alt="edit"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=✏️"
                                />
                            </button>
                            <button>
                                <img
                                    aria-hidden="true"
                                    alt="delete"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=🗑️"
                                />
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td class="border px-4 py-2 text-center">2</td>
                        {/* <td class="border px-4 py-2">GKB000022</td> */}
                        <td class="border px-4 py-2">Huỳnh Anh Tuấn</td>
                        <td class="border px-4 py-2">Khám tai</td>
                        {/* <td class="border px-4 py-2">Phòng tai - mũi - họng</td> */}
                        <td class="border px-4 py-2">Trần Thị Yến Nhi</td>
                        <td class="border px-4 py-2">14-01-2022</td>
                        <td class="border px-4 py-2">
                            <span class="bg-green-500 text-white px-2 py-1 rounded">
                                Đã khám
                            </span>
                        </td>
                        {/* <td class="border px-4 py-2">
                            <span class="bg-green-500 text-white px-2 py-1 rounded">
                                Đã thanh toán
                            </span>
                        </td> */}
                        <td class="border px-4 py-2 flex space-x-2 justify-center">
                            {/* <button>
                                <img
                                    aria-hidden="true"
                                    alt="view"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=👁️"
                                />
                            </button> */}
                            <button>
                                <img
                                    aria-hidden="true"
                                    alt="edit"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=✏️"
                                />
                            </button>
                            <button>
                                <img
                                    aria-hidden="true"
                                    alt="delete"
                                    src="https://openui.fly.dev/openui/24x24.svg?text=🗑️"
                                />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between items-center mt-4">
                <button class="px-4 py-2 border rounded">‹</button>
                <div class="flex space-x-2">
                    <button class="px-4 py-2 border rounded">1</button>
                    <button class="px-4 py-2 border rounded">2</button>
                    <button class="px-4 py-2 border rounded bg-zinc-200">
                        3
                    </button>
                </div>
                <button class="px-4 py-2 border rounded">›</button>
            </div>
        </div>
    );
};

export default Test;
