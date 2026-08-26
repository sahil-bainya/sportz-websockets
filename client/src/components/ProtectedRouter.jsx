import { useSelector,useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetMeQuery } from "../store/adminApi.js";
import { setCredentials, clearCredentials } from "../store/authSlice.js";


export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: isAuthenticated, // ✅ agar Redux me already logged in hai, dobara query mat chalao
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data.data));
    } else if (error) {
      dispatch(clearCredentials());
    }
  }, [data, error, dispatch]);

  // agar already authenticated hai (Redux se), turant render karo — koi wait nahi
  if (isAuthenticated) {
    return children;
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // query settle ho chuki, data mil chuka hai lekin Redux update hone ka wait
  if (data && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // koi valid session nahi mila
  return <Navigate to="/login" replace />;
}
