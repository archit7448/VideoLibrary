import { useNavigate } from "react-router-dom";
import { Header, Sidebar, CardForDelete } from "../../Components/index";
import { useData } from "../../context/data";
import { removeWatchLater } from "../../reducer/index";
import { reverseArrayFunc } from "../../utility/reverseArray/reverseArray";

export const WatchLaterPage = () => {
  const { watchLater, dispatch, token } = useData();
  const DeleteHandler = (videoId, setShow) => {
    setShow(false);
    removeWatchLater({ videoId, token }, dispatch);
  };
  const navigate = useNavigate();
  const reverseArray = reverseArrayFunc(watchLater);
  return (
    <main>
      <Sidebar />
      <aside>
        <Header />
        {token !== null ? (
          <div className="video-wrapper">
            {reverseArray.length > 0 ? (
              reverseArray.map((data) => {
                return (
                  <CardForDelete
                    prop={{
                      data,
                      DeleteHandler,
                      DeleteName: "Remove Video",
                    }}
                  />
                );
              })
            ) : (
              <div className="flex-center flex-col flex-width">
                <h2 className="text-md text-center">Explore Videos</h2>
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
              You have to log in to see Watch Later.
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
