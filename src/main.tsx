import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root.tsx";
import DashboardPage from "./pages/dashboard/dashboard-page.tsx";
import SignUpPage from "./pages/sign-in/sign-up-page.tsx";
import SignInPage from "./pages/sign-in/sign-in-page.tsx";
import NotificationProvider, { globalNotify } from "./context/notification.tsx";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      // NOTIFICATION
      if (Array.isArray(error.message)) {
        globalNotify.error(error.message.join(", "));
      } else {
        globalNotify.error(error.message);
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>
);
