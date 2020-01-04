import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    const res = await axios.post(
      "http://3.20.54.196:8080/users/signup",
      newUser
    );
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post(
      "http://3.20.54.196:8080/users/login",
      LoginRequest
    );

    //EXTRACT TOKEN

    const { token } = res.data;

    //Store token in local storage

    localStorage.setItem("jwtToken", token);

    //set token in header

    setJWTToken(token);

    //decode token on react

    const decoded = jwt_decode(token);

    // dispatch to security reducer

    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
