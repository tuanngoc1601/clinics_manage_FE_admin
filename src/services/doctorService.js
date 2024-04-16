import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const getDoctorClinicService = (clinic_id) => {
    return axiosClient.get(`/api/v1/doctor/get-all-doctor-clinic/${clinic_id}`);
};
