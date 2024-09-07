import { ADD_USER, USER_LOGIN } from "../constatnt";

const user = (
  state = {
    addUser: null,
    userLogin: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, addUser: action.payload };
    case USER_LOGIN:
      return { ...state, userLogin: action.payload };
    default:
      return state;
  }
};
export default user;
