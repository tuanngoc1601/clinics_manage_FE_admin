import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const getScheduleDoctorService = (doctorId, dateString) => {
    return axiosClient.get(
        `/api/v1/schedule/get-schedule-doctor/${doctorId}/${dateString}`
    );
};

export const getAllTimeCodeService = () => {
    return axiosClient.get("/api/v1/schedule/get-all-time-code");
};

export const createTimeScheduleService = (data) => {
    return axiosClient.post("/api/v1/schedule/add-schedule-time-doctor", data);
};

export const deleteTimeScheduleService = (data) => {
    return axiosClient.delete("/api/v1/schedule/delete-schedule-time-doctor", {
        data,
    });
};
