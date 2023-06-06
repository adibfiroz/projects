import { createContext, useEffect, useReducer } from "react";

const INITAIL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || null),
  loading: false,
  error: null,
  savedSoftwares: [],
  likes: [],
};

export const AuthContext = createContext(INITAIL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "UPDATE_START":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        loading: false,
        error: action.payload,
      };
    case "SAVED":
      return {
        ...state,
        user: {
          ...state.user,
          savedSoftwares: [...state.user.savedSoftwares, action.payload],
        },
      };
    case "REMOVE":
      return {
        ...state,
        user: {
          ...state.user,
          savedSoftwares: state.user.savedSoftwares.filter(
            (remove) => remove !== action.payload
          ),
        },
      };
    case "liked":
      return {
        ...state,
        user: {
          ...state.user,
          likes: [state.user.likes, action.payload],
        },
      };
    case "unliked":
      return {
        ...state,
        user: {
          ...state.user,
          likes: state.user.likes.filter((unlike) => unlike !== action.payload),
        },
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITAIL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
