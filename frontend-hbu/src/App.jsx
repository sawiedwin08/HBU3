import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import AuthProvider from "./features/auth/AuthContext"

// Layout
import LayoutAdmin from "./layouts/LayoutAdmin"
import LayoutAuth from "./layouts/LayoutAuth"
// Pages auth
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import RegisterStepSecond from "./pages/auth/RegisterStepSecond"
import RegisterStepThird from "./pages/auth/RegisterStepThird"
import ForgetPassword from "./pages/auth/ForgetPassword"
import ConfirmPasswordReset from "./pages/auth/ConfirmPasswordReset"
import ResetPassword from "./pages/auth/ResetPassword"
// Pages admin
import Error404 from "./pages/Error404"
import Home from "./pages/admin/Home"
import Users from "./pages/admin/Users"
import Activities from "./pages/admin/Activities"
import UsersEstudents from "./pages/admin/UsersEstudents"
import DetalleActividad from "./components/DetailsActivity"
import Settings from "./pages/admin/Settings"
import Report from "./pages/admin/Reports"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<LayoutAuth/>}>
            <Route index element={<Login/>}/>
            <Route path="registro" element={<Register/>}/>
            <Route path="registro/verificacion" element={<RegisterStepSecond/>}/>
            <Route path="activado" element={<RegisterStepThird/>}/>
            <Route path="recuperar-contrasena" element={<ForgetPassword/>}/>
            <Route path="password-reset/:uidb64/:token" element={<ConfirmPasswordReset />} />
            <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
          </Route>
          <Route path="/"
            element={
              <ProtectedRoute>
                <LayoutAdmin />
              </ProtectedRoute>
            }>
            <Route index element={<Home/>}/>
            <Route path="collaborators" element={<Users/>}/>
            <Route path="estudents" element={<UsersEstudents/>}/>
            <Route path="activities" element={<Activities/>}/>
            <Route path="activity/:id" element={<DetalleActividad/>}/>
            <Route path="reports" element={<Report/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Route>
          <Route path="*" element={<Error404/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
