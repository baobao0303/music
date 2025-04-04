import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../../api/react-query/user-react-query";
import { useEffect } from "react";

interface IProtectedRouteProps {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const navigate = useNavigate();

  const { data, isError } = useGetCurrentUser();
  useEffect(() => {
    if (isError) {
      navigate("/sign-in");
    }
    if (data && data.data.role === "user") {
      navigate("/sign-in");
    }
  }, [data, isError, navigate]);

  return children;
}
