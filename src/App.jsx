import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { AuthLayout, Dashboard, UserLayout } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserProfile from "./pages/users/user-profile";
import { Home, Notifications, Profile, Tables } from "./pages/dashboard";

const PrivateRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ authToken }) => {
        return authToken ? children : <Navigate to="/login" />;
      }}
    </AuthContext.Consumer>
  );
};

const AuthenticatedRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ authToken }) => {
        return authToken ? <Navigate to="/" replace /> : children;
      }}
    </AuthContext.Consumer>
  );
};

const routes = [
  {
    path: "/auth/*",
    element: (
      <AuthenticatedRoute>
        <AuthLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/*",
    element: <UserLayout />,
    children: [
      { path: "profile", element: <UserProfile /> },
      { path: "", element: <LandingPage /> },
    ],
  },
  { path: "/admin", element: <Navigate to="/admin/home" replace /> },
  {
    path: "/admin/*",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "home", index: true, element: <Home /> },
      { path: "tables", element: <Tables /> },
      { path: "profile", element: <Profile /> },
      { path: "notifactions", element: <Notifications /> },
      { path: "*", element: <Navigate to="/admin/home" replace /> },
    ],
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
