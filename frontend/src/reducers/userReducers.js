import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { isLoading: true };
        case USER_SIGNIN_SUCCESS:
            return { isLoading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { isLoading: false, error: action.payload};
        case USER_SIGNIN_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { isLoading: true };
        case USER_REGISTER_SUCCESS:
            return { isLoading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { isLoading: false, error: action.payload};
        default:
            return state;
    }
}