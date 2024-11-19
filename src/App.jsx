import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { AuthLayout, Dashboard, UserLayout } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";
import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserProfile from "./pages/users/user-profile";
import {
  Home,
  StaffsTable,
  CompetitionsTable,
  UnitsTable,
  RewardsTable,
} from "./pages/dashboard";
import PublicProfile from "./pages/users/public-profile";
import { UsersTable } from "./pages/dashboard/users-table";
import { PositionsTable } from "./pages/dashboard/positions-table";

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
      { path: ":id", element: <PublicProfile /> },
      { path: "profile/:id", element: <UserProfile /> },
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
      { path: "staffs", element: <StaffsTable /> },
      { path: "units", element: <UnitsTable /> },
      { path: "users", element: <UsersTable /> },
      // { path: "positions", element: <PositionsTable /> },
      { path: "competitions", element: <CompetitionsTable /> },
      { path: "rewards", element: <RewardsTable /> },
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
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
