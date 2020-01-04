import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/backlog/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getBacklogs = backlog_id => async dispatch => {
  try {
    const resp = await axios.get(`/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: resp.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getProjectTask = (
  backlog_id,
  ps_id,
  history
) => async dispatch => {
  try {
    const resp = await axios.get(`/backlog/${backlog_id}/${ps_id}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: resp.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  backlog_id,
  ps_id,
  project_task,
  history
) => async dispatch => {
  try {
    const resp = await axios.patch(
      `/backlog/${backlog_id}/${ps_id}`,
      project_task
    );
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const deleteProjectTask = (backlog_id, ps_id) => async dispatch => {
  try {
    const resp = await axios.delete(
      `http://3.20.54.196:8080/backlog/${backlog_id}/${ps_id}`
    );

    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: ps_id
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
