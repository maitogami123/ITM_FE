import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Guest from "@/components/guest/Guest";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { Dashboard, Auth } from "@/layouts";

const PrivateRoute = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {({ authToken }) => {
        return authToken ? children : <Navigate to="/login" />;
      }}
    </AuthContext.Consumer>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path="/*" element={<Guest />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
