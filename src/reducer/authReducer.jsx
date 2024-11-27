//reducer function to handle our login state
export const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    }
    default: {
      return state;
    }
  }
};
