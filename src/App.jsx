import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";
import Guest from "@/components/guest/Guest";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";

const PrivateRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ authToken }) => {
        return authToken ? children : <Navigate to="/login" />;
      }}
    </AuthContext.Consumer>
  );
};

const routes = [
  { path: "/auth/*", element: <Auth /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/*", element: <Guest /> },
  {
    path: "/admin/*",
    element: (
      <PrivateRoute>
        {" "}
        <Dashboard />{" "}
      </PrivateRoute>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
];

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
