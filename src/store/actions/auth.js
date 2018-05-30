import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
};

export const authFail = (error) => {
  return {
      type: actionTypes.AUTH_FAIL,
      error: error
  }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        const key = 'AIzaSyDkGmf14VBeTxx57FsLtqLnA9FyA1D_0e4';

        if(isSignup) {
            axios.post('/signupNewUser?key=' + key, authData)
                .then(response => {
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn))
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                });
        } else {
            axios.post('/verifyPassword?key=' + key, authData)
                .then(response => {
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                });
        }
    }
};
