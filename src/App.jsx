import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JwtContextProvider } from "./contexts/jwtContext";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import ArtistCards from "./pages/ArtistCards/ArtistCards";
import Projects from "./pages/Projects/Projects";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import Media from "./pages/Media/Media";
import MediaDetail from "./pages/MediaDetail/MediaDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RequireAuth from "./components/RequiredAuth";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
import UserProjectDetail from "./pages/UserProjectDetail/UserProjectDetail";
import UserMediaDetail from "./pages/UserMediaDetail/UserMediaDetail";
import UserNewProject from "./pages/UserNewProject/UserNewProject";
import UserNewMedia from "./pages/UserNewMedia/UserNewMedia";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "🌚" : "☀️");

  const switchTheme = () => {
    const newTheme = theme === "☀️" ? "🌚" : "☀️";
    setTheme(newTheme);
  };

  return (
    <JwtContextProvider>
      <div className="App" data-theme={theme}>
        <Router>
          <Header switchTheme={switchTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/newproject"
              element={
                <RequireAuth>
                  <UserNewProject />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/newmedia"
              element={
                <RequireAuth>
                  <UserNewMedia />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/projects/:id"
              element={
                <RequireAuth>
                  <UserProjectDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/medias/:id"
              element={
                <RequireAuth>
                  <UserMediaDetail />
                </RequireAuth>
              }
            />
            <Route path="/artists/projects/:id" element={<ProjectDetail />} />
            <Route path="/artists/medias/:id" element={<MediaDetail />} />
            <Route path="/artists" element={<ArtistCards />} />
            <Route path="/artists/:username" element={<ArtistDetail />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </JwtContextProvider>
  );
}

export default App;
