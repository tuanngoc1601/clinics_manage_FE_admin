import { createAxiosBaseUrl, createAxiosClient } from "../axios";

const axiosClient = createAxiosBaseUrl();

const axiosClientToken = createAxiosClient();

export const getDoctorClinicService = (clinic_id) => {
    return axiosClient.get(`/api/v1/doctor/get-all-doctor-clinic/${clinic_id}`);
};

export const getDoctorDetailService = (doctorId) => {
    return axiosClient.get(`/api/v1/doctor/get-doctor-by-id/${doctorId}`);
};

export const updateDoctorInfoService = (doctor_id, info) => {
    return axiosClient.put(`/api/v1/doctor/update-doctor-info/${doctor_id}`, info);
};
