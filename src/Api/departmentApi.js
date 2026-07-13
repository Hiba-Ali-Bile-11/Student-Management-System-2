import axios from "axios";

const API_URL = "http://localhost:5000/department";


// ================= GET ALL DEPARTMENTS =================
export const getDepartments = async () => {

    const response = await axios.get(`${API_URL}/all`);

    return response.data;
};


// ================= GET DEPARTMENT BY ID =================
export const getDepartmentById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
};


// ================= CREATE DEPARTMENT =================
export const createDepartment = async (department) => {

    const response = await axios.post(
        API_URL,
        department
    );

    return response.data;
};


// ================= UPDATE DEPARTMENT =================
export const updateDepartment = async (id, department) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        department
    );

    return response.data;
};


// ================= DELETE DEPARTMENT =================
export const deleteDepartment = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};