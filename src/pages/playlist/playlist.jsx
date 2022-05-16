import { useNavigate } from "react-router-dom";
import { Header, PlaylistCard, Sidebar } from "../../Components/index";
import { useData } from "../../context/data";
export const PlaylistPage = () => {
  const { playList } = useData();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <main>
      <Sidebar />
      <aside>
        <Header />
        {token !== null ? (
          <div className="video-wrapper">
            {playList.length > 0 ? (
              playList.map((playlistEach) => {
                const { _id } = playlistEach;
                return <PlaylistCard prop={{ playlistEach }} key={_id} />;
              })
            ) : (
              <div className="flex-center flex-col flex-width">
                <h2 className="text-md text-center">Empty Playlist!</h2>
                <button
                  className="button-primary"
                  onClick={() => navigate("/explore")}
                >
                  Explore
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-center flex-col flex-width">
            <h2 className="text-md text-center">
              You have to log in to see Playlist
            </h2>
            <button
              className="button-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </aside>
    </main>
  );
};
