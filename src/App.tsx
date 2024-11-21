/* App Component */

import { Route, Routes } from "react-router-dom";
import "./scss/main.scss";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlanPage from "./pages/protected /PlanPage";
import ImageGalleryPage from "./pages/protected /ImageGalleryPage";
import AddNewImagePage from "./pages/protected /AddNewImagePage";
import EditImagePage from "./pages/protected /EditImagePage";
import AccountSettingsPage from "./pages/protected /AccountSettingsPage";
import PublicLayout from "./layouts/PublicLayout";
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <div id="app">
      <Routes>
        {/** Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/** Protected Routes */}
        <Route path="/today" element={<PlanPage />} />
        <Route path="/image-gallery" element={<ImageGalleryPage />} />
        <Route path="/add-image" element={<AddNewImagePage />} />
        <Route path="/edit-image" element={<EditImagePage />} />
        <Route path="/settings" element={<AccountSettingsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
