import axios from "axios";

const API_URL = "http://localhost:5000/users";


// ================= GET ALL USERS =================
export const getAllUsers = async () => {

    const response = await axios.get(`${API_URL}/all`);

    return response.data;
};



// ================= GET USER BY ID =================
export const getUserById = async (id) => {

    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
};



// ================= CREATE USER =================
export const createUser = async (user) => {

    const response = await axios.post(
        API_URL,
        user
    );

    return response.data;
};



// ================= UPDATE USER =================
export const updateUser = async (id, user) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        user
    );

    return response.data;
};



// ================= DELETE USER =================
export const deleteUser = async (id) => {

    const response = await axios.delete(
        `${API_URL}/${id}`
    );

    return response.data;
};



// ================= SEARCH USER =================
export const searchUser = async (username) => {

    const response = await axios.get(
        `${API_URL}/search/${username}`
    );

    return response.data;
};



// ================= LOGIN =================
export const loginUser = async (data) => {

    const response = await axios.post(
        `${API_URL}/login`,
        data
    );

    return response.data;
};



// ================= LOGOUT =================
export const logoutUser = async () => {

    const response = await axios.post(
        `${API_URL}/logout`
    );

    return response.data;
};



// ================= CHANGE PASSWORD =================
export const changePassword = async (data) => {

    const response = await axios.put(
        `${API_URL}/change-password`,
        data
    );

    return response.data;
};



// ================= FORGET PASSWORD =================
export const forgetPassword = async (data) => {

    const response = await axios.put(
        `${API_URL}/forget-password`,
        data
    );

    return response.data;
};