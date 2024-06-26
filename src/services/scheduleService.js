import { createAxiosClient } from "../axios";

const axiosClientToken = createAxiosClient();

export const getScheduleDoctorService = (doctorId, dateString) => {
    return axiosClientToken.get(
        `/api/v1/schedule/get-schedule-doctor/${doctorId}/${dateString}`
    );
};

export const getAllTimeCodeService = () => {
    return axiosClientToken.get("/api/v1/schedule/get-all-time-code");
};

export const createTimeScheduleService = (data) => {
    return axiosClientToken.post(
        "/api/v1/schedule/add-schedule-time-doctor",
        data
    );
};

export const deleteTimeScheduleService = (data) => {
    return axiosClientToken.delete(
        "/api/v1/schedule/delete-schedule-time-doctor",
        {
            data,
        }
    );
};
