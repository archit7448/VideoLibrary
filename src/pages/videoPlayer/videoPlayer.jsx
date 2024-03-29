import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/data";
import { Header, PlaylistModal, Sidebar } from "../../Components/index";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import "./videoPlayer.css";
import { useState, useEffect } from "react";
import { likeVideo, unlikeVideo, addWatchLater } from "../../reducer/index";
import { notifyMessage } from "../../utility/notification/utility-toast";
import copy from "copy-to-clipboard";
import axios from "axios";
import { Loader } from "../../utility/loader/loader";
export const VideoPage = () => {
  const { VideoId } = useParams();
  const { setModal, dispatch, liked, watchLater, token } = useData();
  const [show, setShow] = useState(false);
  const [videoState, setVideoState] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  let _id, description, MovieName, categoryName;

  if (videoState.length !== 0) {
    ({ _id, description, MovieName, categoryName } = videoState);
  }

  //ForPlaylist

  useEffect(() => {
    (async (videoId) => {
      try {
        const response = await axios.get(`/api/video/${videoId}`);
        setVideoState({ ...response.data.video });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })(VideoId);
  }, []);

  const PlayListHandler = () => {
    token !== null ? dispatch({ type: "TOGGLE_MODAL" }) : navigate("/login");
  };

  ///For Liked Handler
  const CheckLiked = (videoLikedId) => {
    return liked.find(({ _id }) => _id === videoLikedId) === undefined
      ? false
      : true;
  };

  const LikedHandler = () => {
    if (token !== null) {
      CheckLiked(_id)
        ? unlikeVideo({ _id, token }, dispatch)
        : likeVideo({ video: videoState, token }, dispatch);
    } else {
      navigate("/login");
    }
  };

  ///For WatchLater
  const WatchHandler = (WatchLaterId) => {
    if (token !== null) {
      if (watchLater.find(({ _id }) => _id === WatchLaterId)) {
        notifyMessage("Already in Watch Later");
      } else {
        addWatchLater({ token, video: videoState }, dispatch);
      }
    } else {
      navigate("/login");
    }
  };

  //For Share
  const CopyToClipBoard = () => {
    copy(`https://strangelibrary.netlify.app${location.pathname}`);
    notifyMessage("Copied sucessfully");
  };

  return videoState.length === 0 ? (
    <Loader />
  ) : (
    <main>
      <Sidebar />
      {setModal && <PlaylistModal prop={videoState} />}
      <aside className="video-page">
        <Header />
        <div className="iframe-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${_id}?autoplay=1`}
            allowFullScreen="allowFullScreen"
          />
          <h2 className="category-tag">{`#${categoryName}`}</h2>
          <h1 className="movie-tag">{MovieName}</h1>
          <div className="flex-row ">
            <div className="func-wrapper" onClick={() => LikedHandler()}>
              {CheckLiked(_id) ? <AiFillLike /> : <AiOutlineLike />}
              {CheckLiked(_id) ? "Liked" : "Like"}
            </div>
            <div className="func-wrapper" onClick={() => WatchHandler(_id)}>
              <MdWatchLater /> WatchLater
            </div>
            <div className="func-wrapper" onClick={() => CopyToClipBoard()}>
              <IoIosShareAlt />
              Share
            </div>
            <div className="func-wrapper" onClick={() => PlayListHandler()}>
              <MdPlaylistAdd />
              Playlist
            </div>
          </div>
          {!show && (
            <h1 className="description-tag" onClick={() => setShow(() => true)}>
              description
            </h1>
          )}
          {show && (
            <div>
              <h3 className="description-para">{description}</h3>
              <h2
                className="description-tag"
                onClick={() => setShow(() => false)}
              >
                show-less
              </h2>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
};
