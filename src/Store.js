import React from "react";

const stateContext = React.createContext(undefined, undefined);
const dispatchContext = React.createContext(undefined, undefined);

const initialState = {
  movieArray: [],
  fullMovie: {},
  setMovie: "",
  movieID: "",
  loading: false,
  handleModal: false,
  message: "",
};

function stateReducer(state, action) {
  switch (action.type) {
    case "GET_FULL": {
      return {
        ...state,
        movieID: null,
        fullMovie: action.payload,
        message: null,
        loading: false,
      };
    }
    case "GET_MOVIE": {
      return {
        ...state,
        setMovie: null,
        movieArray: action.payload,
        message: null,
        loading: false,
      };
    }
    case "LOADING": {
      return {
        ...state,
        setMovie: null,
        movieID: null,
        message: null,
        loading: true,
      };
    }
    case "OPEN_MODAL": {
      return {
        ...state,
        handleModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        handleModal: false,
      };
    }
    case "FETCH": {
      return {
        ...state,
        setMovie: action.payload,
        loading: false,
      };
    }
    case "GET_MOVIE_DETAIL": {
      return {
        ...state,
        movieID: action.payload,
        loading: false,
      };
    }
    case "FETCH_FAIL": {
      return {
        ...state,
        movieArray: null,
        message: action.payload,
        loading: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  return (
    <stateContext.Provider value={state}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </stateContext.Provider>
  );
}

function useContextState() {
  const context = React.useContext(stateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}

function useContextDispatch() {
  const context = React.useContext(dispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
}

export { ContextProvider, useContextState, useContextDispatch };
