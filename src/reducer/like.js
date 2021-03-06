import axios from "axios";
export const likeVideo = ({ token, video }, dispatch) => {
  (async () => {
    try {
      const response = await axios.post(
        "/api/user/likes",
        {
          video,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: "UPDATE_LIKES", payload: response.data.likes });
    } catch (error) {
      console.log(error);
    }
  })();
};

export const unlikeVideo = ({ _id, token }, dispatch) => {
  (async () => {
    try {
      const response = await axios.delete(`/api/user/likes/${_id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "UPDATE_LIKES", payload: response.data.likes });
    } catch (error) {
      console.log(error);
    }
  })();
};
