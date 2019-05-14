import { ATTEMPT_LOGIN, ATTEMPT_LOGIN_FAIL, ATTEMPT_LOGIN_SUCCESS } from "./Actions/Login";


export interface IAuthenticationState {
    User: null | firebase.User;
    Loading: boolean;
}

export const defaultState: IAuthenticationState = {
    User: null,
    Loading: false
}

export default (state: IAuthenticationState = defaultState, action: any): IAuthenticationState => {
    switch (action.type) {
        case ATTEMPT_LOGIN:
            state = {
                ...state,
                Loading: true
            };
            break;
        case ATTEMPT_LOGIN_FAIL:
            state = {
                ...state,
                User: null,
                Loading: false
            };
            break;
        case ATTEMPT_LOGIN_SUCCESS:
            state = {
                ...state,
                User: action.payload,
                Loading: false
            };
            break;
    }
    return state;
};