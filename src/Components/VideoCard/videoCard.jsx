import { useData } from "../../context/data";
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./videoCard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addWatchLater, addHistory } from "../../reducer/index";
import { notifyMessage } from "../../utility/notification/utility-toast";
export const VideoCard = ({ prop }) => {
  const { data } = prop;
  const [show, setShow] = useState(false);
  const { dispatch, watchLater, history, token } = useData();
  const navigate = useNavigate();
  const { _id, MovieName } = data;
  //Playlist Handler
  const PlayListHandler = () => {
    if (token !== null) {
      dispatch({ type: "TOGGLE_MODAL", payload: data });
      setShow((show) => !show);
    } else {
      navigate("/login");
    }
  };
  //Watch Later Handler
  const WatchHandler = (WatchLaterId) => {
    setShow(false);
    if (token !== null) {
      if (watchLater.find(({ _id }) => _id === WatchLaterId)) {
        notifyMessage("Already in Watch Later");
      } else {
        addWatchLater({ token, video: data }, dispatch);
      }
    } else {
      navigate("/login");
    }
  };
  // History Handler

  const HistoryHandler = (historyId) => {
    if (token !== null) {
      if (history.find(({ _id }) => _id === historyId)) {
        navigate(`/explore/${_id}`);
      } else {
        navigate(`/explore/${_id}`);
        addHistory({ token, video: data }, dispatch);
      }
    } else {
      navigate(`/explore/${_id}`);
    }
  };

  return (
    <div className="video-card">
      <img
        src={`https://i.ytimg.com/vi/${_id}/maxresdefault.jpg`}
        onClick={() => HistoryHandler(_id)}
      />
      <div className="flex-row flex-space-between flex-center video-data-div">
        <h1 className="text-sm">{MovieName}</h1>
        <div className="video-card-func-wrapper flex-row">
          {show && (
            <div className="video-card-hover">
              <button onClick={() => WatchHandler(_id)}>
                {" "}
                <MdWatchLater />
                Add to WatchLater
              </button>
              <button onClick={() => PlayListHandler()}>
                <MdPlaylistAdd />
                Add to Playlist
              </button>
            </div>
          )}
          <div
            className="video-card-vertical"
            onClick={() => setShow((show) => !show)}
          >
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};
