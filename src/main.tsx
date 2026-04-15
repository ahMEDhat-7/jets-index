import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n";
import "./index.css";
import App from "./App";
import HomePage from "./pages/Home";
import BrowsePage from "./pages/Browse";
import BlogPage from "./pages/Blog";
import LoginPage from "./pages/admin/Login";
import DashboardPage from "./pages/admin/Dashboard";
import BlogsPage from "./pages/admin/Blogs";
import PlatformsPage from "./pages/admin/Platforms";
import CategoriesPage from "./pages/admin/Categories";
import CountriesPage from "./pages/admin/Countries";
import ManufacturersPage from "./pages/admin/Manufacturers";
import ProtectedRoute from "./components/admin/ProtectedRoute";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <BlogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/platforms"
        element={
          <ProtectedRoute>
            <PlatformsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/countries"
        element={
          <ProtectedRoute>
            <CountriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manufacturers"
        element={
          <ProtectedRoute>
            <ManufacturersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/en" replace />} />
        <Route path=":lang">
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
