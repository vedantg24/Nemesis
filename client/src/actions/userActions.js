import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    ADD_USER,
    GET_USERS,
    USER_ERROR,
    REGISTER_FAIL,
    AUTH_ERROR,
    DELETE_USER
} from "./types";

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users/getMe');
        dispatch({ type: USER_LOADED, payload: res.data });

    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
}

//Login User
export const login = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        setAuthToken(res.data.token);
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
};

//Add a new User 
export const addUser = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users/register', data, config);

        dispatch({ type: ADD_USER, payload: res.data });

    } catch (err) {
        dispatch({ type: REGISTER_FAIL, payload: err.response.statusText })
    }
};

//Get users from server
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users')
        dispatch({ type: GET_USERS, payload: res.data });

    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.response.statusText })
    }
};

//Delete user
export const deleteUser = (id) => async dispatch => {

    try {
        await axios.delete(`/api/users/${id}`);

        dispatch({ type: DELETE_USER, payload: id });

    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.response.statusText })
    }
};

