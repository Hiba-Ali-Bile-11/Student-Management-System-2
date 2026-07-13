import axios from "axios";

const API_URL = "http://localhost:5000/student";


// ================= GET ALL STUDENTS =================
export const getStudents = async () => {

    const response = await axios.get(`${API_URL}/all`);

    return response.data;
};



// ================= GET STUDENT BY ID =================
export const getStudentById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
};



// ================= CREATE STUDENT =================
export const createStudent = async (student) => {

    const response = await axios.post(
        API_URL,
        student
    );

    return response.data;
};



// ================= UPDATE STUDENT =================
export const updateStudent = async (id, student) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        student
    );

    return response.data;
};



// ================= DELETE STUDENT =================
export const deleteStudent = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};



// ================= SEARCH STUDENT =================
export const searchStudent = async (keyword) => {

    const response = await axios.get(
        `${API_URL}/search/${keyword}`
    );

    return response.data;
};