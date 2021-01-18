// reducerlar  state ve action degeri alirlar
//baslangic state'ne  ve action type'na gore yeni state donerler
import * as types from "../actions/types";

const initialState = {
  posts: [],
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        //state i dogrudan degistiremeyiz. kopyasini almak gerekir
        ...state,
        posts: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default postReducer;
