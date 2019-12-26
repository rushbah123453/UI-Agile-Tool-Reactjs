import axios from "axios";
import { GET_ERRORS, GET_BACKLOG } from "./types";

export const addProjectTask = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(
      `http://localhost:8080/backlog/${backlog_id}`,
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

export const getBacklogs = backlog_id => async dispatch => {
  try {
    const resp = await axios.get(`http://localhost:8080/backlog/${backlog_id}`);
    dispatch({
      type: GET_BACKLOG,
      payload: resp.data
    });
  } catch (error) {}
};
