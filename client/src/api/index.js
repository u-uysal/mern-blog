import axios from "axios";
const apiEndpoint = "/posts/";

export const fetchPosts = async () => await axios.get(apiEndpoint);
export const createPost = async (post) => await axios.post(apiEndpoint, post);
