import * as types from "./types";

export const fetchPosts = () => async () => {
  //action creatorler action objeleri donerler
  return {
    type: types.FETCH_POSTS,
    //veriyi tasidiklari alan
    payload: [],
  };
};
