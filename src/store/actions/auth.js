import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            email: email,
            password: password
        };

        if(isSignup) {
            axios.post('/_User', authData)
                .then(response => {
                    console.log(response);
                    dispatch(authSuccess(response.data.sessionToken, response.data.objectId));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err));
                });
        } else {
            axios.get('/_User', {params: authData})
                .then(response => {
                    console.log(response);
                    dispatch(authSuccess(response.data))
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err));
                });
        }
    }
};
