import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import "./index.css";
import App from "./App";
import BrowsePage from "./pages/Browse";
import BlogPage from "./pages/Blog";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/en" replace />} />
        <Route path=":lang">
          <Route index element={<Navigate to="browse" replace />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
