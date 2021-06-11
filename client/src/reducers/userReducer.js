import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    ADD_USER,
    GET_USERS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_ERROR,
    DELETE_USER
} from "../actions/types";

const initialState = {
    user: null,
    error: null,
    isAuthenticated: false,
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case USER_ERROR:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(users => users._id !== action.payload)
            }
        default:
            return state;
    }
}