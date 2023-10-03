const INITIAL_STATE = {
  id: null,
  username: "",
  role: "",
  errorLogin: false,
  regisErr: [false, ""],
  regisSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default userReducer;
