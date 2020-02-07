import { useEffect } from "react";
import Axios from "axios";
import { useContextDispatch, useContextState } from "../Store";

export function useFetch(input) {
  const dispatch = useContextDispatch();
  const { movieArray } = useContextState();

  useEffect(() => {
    if (!input) {
      return;
    }

    const source = Axios.CancelToken.source();

    dispatch({ type: "LOADING" });
    async function getData() {
      try {
        const response = await Axios.get(
          `http://www.omdbapi.com/?apikey=4fdbcb36&s=${input}`,
        );
        if (response.data.Error) {
          dispatch({ type: "FETCH_FAIL", payload: response.data.Error });
        }
        dispatch({ type: "GET_MOVIE", payload: response.data.Search });
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
  return [movieArray];
}
