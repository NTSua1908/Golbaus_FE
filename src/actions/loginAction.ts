export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_EXPIRE = 'LOGIN_EXPIRE';
export const LOGOUT = 'LOGOUT';

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginExpire = () => ({
  type: LOGIN_EXPIRE,
});

export const logout = () => ({
  type: LOGOUT,
});
