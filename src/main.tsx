import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root.tsx";
import DashboardPage from "./pages/dashboard/dashboard-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/manage-songs",
        element: <div>Manage Song</div>,
      },
      {
        path: "/upload",
        element: <div>Upload Song</div>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <div>Sign In Page</div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
