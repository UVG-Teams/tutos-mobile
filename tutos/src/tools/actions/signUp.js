import * as types from '../types/signUp';

export const startSignUp = (username, password, firstName, lastName, email, birthdate, gender, isTutor,phone, price) => ({
  type: types.SIGN_UP_STARTED,
  payload: {
    username,
    password,
    firstName,
    lastName,
    email,
    gender,
    phone,
    birthdate,
    isTutor,
    individualPrice: price,
  },
});

export const completeSignUp = () => ({
  type: types.SIGN_UP_COMPLETED,
});

export const failSignUp = error => ({
  type: types.SIGN_UP_FAILED,
  payload: { error },
});