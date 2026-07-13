import axios from "axios";

const API_URL = "http://localhost:5000/courses";


// ================= GET ALL COURSES =================
export const getCourses = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};


// ================= GET COURSE BY ID =================
export const getCourseById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};


// ================= CREATE COURSE =================
export const createCourse = async (course) => {

    const response = await axios.post(
        API_URL,
        course
    );

    return response.data;
};


// ================= UPDATE COURSE =================
export const updateCourse = async (id, course) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        course
    );

    return response.data;
};


// ================= DELETE COURSE =================
export const deleteCourse = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};