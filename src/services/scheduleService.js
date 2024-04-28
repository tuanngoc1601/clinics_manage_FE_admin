import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const getScheduleDoctorService = (doctorId, dateString) => {
    return axiosClient.get(
        `/api/v1/schedule/get-schedule-doctor/${doctorId}/${dateString}`
    );
};
