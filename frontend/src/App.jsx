import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext.jsx';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import SubmitComplaint from './pages/SubmitComplaint';
import UserDashboard from './pages/UserDashboard';
import MyProfile from './pages/MyProfile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/submit-complaint"
          element={
            <PrivateRoute>
              <SubmitComplaint />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
