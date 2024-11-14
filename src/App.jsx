import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { AuthLayout, Dashboard, UserLayout } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserProfile from "./pages/users/user-profile";

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
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "", element: <LandingPage /> },
    ],
  },
  {
    path: "/admin/*",
    element: (
      <PrivateRoute>
        <Dashboard />
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
