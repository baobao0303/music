import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root.tsx";
import DashboardPage from "./pages/dashboard/dashboard-page.tsx";
import SignUpPage from "./pages/sign-in/sign-up-page.tsx";
import SignInPage from "./pages/sign-in/sign-in-page.tsx";

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
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
