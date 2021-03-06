import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  ExplorePage,
  HistoryPage,
  HomePage,
  LikedPage,
  WatchLaterPage,
  PlaylistPage,
  LogInPage,
  SignUpPage,
  VideoPage,
  PageForEachPlaylist,
  RestrictedRoute,
} from "./pages/index";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/WatchLater" element={<WatchLaterPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/explore/:VideoId" element={<VideoPage />} />
        <Route path="/playlist/:playlistId" element={<PageForEachPlaylist />} />
        <Route element={<RestrictedRoute />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
