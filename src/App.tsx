/* App Component */

import { Route, Routes } from "react-router-dom";
import "./scss/main.scss";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import SchedulePage from "./pages/protected /SchedulePage";
import NotFoundPage from "./pages/NotFoundPage";
import ImageGalleryPage from "./pages/protected /ImageGalleryPage";
import AddNewImagePage from "./pages/protected /AddNewImagePage";
import EditImagePage from "./pages/protected /EditImagePage";
import AccountSettingsPage from "./pages/protected /AccountSettingsPage";
import PublicLayout from "./layouts/PublicLayout";
import Footer from "./components/navigation/Footer";
import ProtectedLayout from "./layouts/ProtectedLayout";
import LoginPage from "./pages/LoginPage";
import useTheme from "./hooks/useTheme";
import { useEffect } from "react";
import CreatedSchedulePage from "./pages/protected /CreatedSchedulePage";

function App() {
  const { darkmode } = useTheme();

  useEffect(() => {
    // Add or remove the 'dark-mode' class on the body tag
    if (darkmode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkmode]);

  return (
    <div id="root">
      <Routes>
        {/** Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/** Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/schedule/:id" element={<CreatedSchedulePage />} />
          <Route path="/image-gallery" element={<ImageGalleryPage />} />
          <Route path="/add-image" element={<AddNewImagePage />} />
          <Route path="/edit-image/:id" element={<EditImagePage />} />
          <Route path="/settings" element={<AccountSettingsPage />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
