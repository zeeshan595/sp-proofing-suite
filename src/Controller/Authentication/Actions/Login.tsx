import * as firebase from "firebase/app";

export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
export const ATTEMPT_LOGIN_SUCCESS = "ATTEMPT_LOGIN_SUCCESS";
export const ATTEMPT_LOGIN_FAIL = "ATTEMPT_LOGIN_FAIL";
let isAttemptingLogin = false;

export const attemptLogin = (email, password) => {
    if (isAttemptingLogin) return;
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            dispatch({
                type: ATTEMPT_LOGIN
            });
            isAttemptingLogin = true;
            const login = await firebase.app().auth().signInWithEmailAndPassword(email, password);
            if (!login.user) {
                dispatch({
                    type: ATTEMPT_LOGIN_FAIL,
                    payload: "Wrong username or password"
                });
                isAttemptingLogin = false;
                reject();
                return;
            }

            dispatch({
                type: ATTEMPT_LOGIN_SUCCESS,
                payload: login.user
            });
            isAttemptingLogin = true;
            resolve();
        });
    }
};