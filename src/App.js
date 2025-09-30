import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Website pages
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Events from "./pages/Events";
import MemberLogin from "./pages/MemberLogin";
import MemberShip from "./pages/MemberShip";
import Podcast from "./pages/Podcast";
import Resources from "./pages/Resources";
import Webinars from "./pages/Webinars";
import Register from "./dashboard/pages/Register";
// Dashboard pages
import PrivateRoute from "./dashboard/component/PrivateRoute";
import AdminDashboard from "./dashboard/pages/AdminDashboard";
import OperatorDashboard from "./dashboard/pages/OperatorDashboard";
import EnablerDashboard from "./dashboard/pages/EnablerDashboard";
import AllEnablers from "./components/AllEnablers";

function App() {
  return (
    <Routes>
      {/* Website routes */}
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/events" element={<Events />} />
      <Route path="/membership" element={<MemberShip />} />
      <Route path="/podcast" element={<Podcast />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/webinars" element={<Webinars />} />
      <Route path="/login" element={<MemberLogin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/allenablers" element={<AllEnablers />} />
      {/* Dashboard routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/operator"
        element={
          <PrivateRoute allowedRoles={["operator", "admin"]}>
            <OperatorDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/enabler"
        element={
          <PrivateRoute allowedRoles={["enabler"]}>
            <EnablerDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
