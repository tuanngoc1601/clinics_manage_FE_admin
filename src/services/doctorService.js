import { createAxiosClient } from "../axios";

const axiosClientToken = createAxiosClient();

export const getDoctorClinicService = (clinic_id) => {
    return axiosClientToken.get(
        `/api/v1/doctor/get-all-doctor-clinic/${clinic_id}`
    );
};

export const getDoctorDetailService = (doctorId) => {
    return axiosClientToken.get(`/api/v1/doctor/get-doctor-by-id/${doctorId}`);
};

export const updateDoctorInfoService = (doctor_id, info) => {
    return axiosClientToken.put(
        `/api/v1/doctor/update-doctor-info/${doctor_id}`,
        info
    );
};
