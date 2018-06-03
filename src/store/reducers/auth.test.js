import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should have the correct initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });

    it('should store token on login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'someToken',
            userId: 'some-user-id'
        })).toEqual({
            token: 'someToken',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirect: '/'
        });
    });
});