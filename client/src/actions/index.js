import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
  try {
    const user = await axios.get("/api/current_user");
    dispatch({
      type: FETCH_USER,
      payload: user.data
    });
  } catch(e) {
    console.error(e.message);
  }
};
