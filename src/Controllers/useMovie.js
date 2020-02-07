import { useEffect } from "react";
import Axios from "axios";
import { useContextDispatch, useContextState } from "../Store";

export function useFullMovie(input) {
  const dispatch = useContextDispatch();
  const { fullMovie } = useContextState();

  useEffect(() => {
    const source = Axios.CancelToken.source();

    if (!input) {
      return;
    }
    async function getData() {
      try {
        const response = await Axios.get(
          `http://www.omdbapi.com/?apikey=4fdbcb36&i=${input}`,
        );
        if (response.data.Error) {
          dispatch({ type: "FETCH_FAIL", payload: response.data.Error });
        }
        dispatch({ type: "GET_FULL", payload: response.data });
        dispatch({ type: "OPEN_MODAL" });
      } catch (error) {
        if (Axios.isCancel(error)) {
          dispatch({ type: "FETCH_FAIL", payload: error });
        } else {
          throw error;
        }
      }
    }

    getData();
    return () => {
      source.cancel();
    };
  }, [input]);
  return [fullMovie];
}
