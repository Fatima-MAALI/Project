import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage, LoginPage, Page404, RegisterPage, ServicesPage } from "./pages"
import DashboardLayout from "./layouts/dashboard-layout"
import ProfilePage from "./pages/profile/profile/profile"
import AppointementHistoryPage from "./pages/profile/appointement-history/appointement-history"
import BookAppointementPage from "./pages/profile/book-appointements/book-appointement"
import MessagesPage from "./pages/profile/messages/messages"
import ProfileSettingsPage from "./pages/profile/settings/settings"

import DoctorPage from "./pages/doctor/doctor/doctor"
import ManageAppontementsPage from "./pages/doctor/manage-appointements/manage-appointements"
import PatientDetailsPage from "./pages/doctor/patient-details/patient-details"
import UpcomingAppointementsPage from "./pages/doctor/upcoming-appointements/upcoming-appointements"
import DoctorSettingsPage from "./pages/doctor/settings/settings"
import AdminPage from "./pages/admin/admin/admin"
import AdminAppointementAndPatientsPage from "./pages/admin/appointements-and-patients/appointements-and-patients"
import AdminDoctorsPage from "./pages/admin/doctors/doctors"

import RequireAuth from "./utils/require-auth"
import RequireNoAuth from "./utils/require-no-auth"
import RequirePatient from "./utils/require-patient"
import RequireDoctor from "./utils/require-doctor"
import RequireAdmin from "./utils/require-admin"
import LogoutPage from "./pages/logout/logout"
import ThemeDropDown from "./components/shared/theme-dropdown"
import ContactsPage from "./pages/admin/contacts"
import { Contact, History, LayoutDashboard, List, ListChecks, LogOut, Mail, User, Users, Users2 } from "lucide-react"





const profile_links = {
  links: [
    { label: "Profile", href: "/profile/", icon: <User /> },
    { label: "Book appointements", href: "/profile/book-appointements", icon: <List /> },
    { label: "Appointements history ", href: "/profile/appointements-history", icon: <History /> },
    { label: "Messages", href: "/profile/messages", icon: <Mail /> },
    { label: "Logout", href: "/logout", icon: <LogOut /> },
  ],
  settings: "/profile/settings"
}
const doctor_links = {
  links: [
    { label: "Profile", href: "/doctor", icon: <User /> },
    { label: "Manage appointements", href: "/doctor/manage-appointements", icon: <List /> },
    { label: "Upcoming appointements ", href: "/doctor/upcoming-appointements", icon: <ListChecks /> },
    { label: "Patient details", href: "/doctor/patient-details", icon: <Users /> },
    { label: "Logout", href: "/logout", icon: <LogOut /> },
  ],
  settings: "/doctor/settings"
}
const admin_links = {
  links: [
    { label: "Dashboard", href: "/admin", icon: <LayoutDashboard /> },
    { label: "Appointements & patients", href: "/admin/appointements-and-patients", icon: <List /> },
    { label: "Doctors ", href: "/admin/doctors", icon: <Users2 /> },
    { label: "Contacts", href: "/admin/contacts", icon: <Contact /> },
    { label: "Logout", href: "/logout", icon: <LogOut /> },
  ],
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/register" element={<RequireNoAuth><RegisterPage /></RequireNoAuth>} />
        <Route path="/login" element={<RequireNoAuth><LoginPage /></RequireNoAuth>} />

        <Route path="/profile" element={<RequirePatient><DashboardLayout links={profile_links.links} settings={profile_links.settings} /></RequirePatient>} >
          <Route path="/profile" element={<ProfilePage />} />BookAppointementPage
          <Route path="/profile/book-appointements" element={<BookAppointementPage />} />
          <Route path="/profile/appointements-history" element={<AppointementHistoryPage />} />
          <Route path="/profile/messages" element={<MessagesPage />} />
          <Route path="/profile/settings" element={<ProfileSettingsPage />} />
        </Route>

        <Route path="/doctor" element={<RequireDoctor><DashboardLayout links={doctor_links.links} settings={doctor_links.settings} /></RequireDoctor>} >
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/doctor/manage-appointements" element={<ManageAppontementsPage />} />
          <Route path="/doctor/upcoming-appointements" element={<UpcomingAppointementsPage />} />
          <Route path="/doctor/patient-details" element={<PatientDetailsPage />} />
          <Route path="/doctor/settings" element={<DoctorSettingsPage />} />
        </Route>

        <Route path="/admin" element={<RequireAdmin><DashboardLayout links={admin_links.links} /></RequireAdmin>} >
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/appointements-and-patients" element={<AdminAppointementAndPatientsPage />} />
          <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
          <Route path="/admin/contacts" element={<ContactsPage />} />
        </Route>

        <Route path="/logout" element={<RequireAuth><LogoutPage /></RequireAuth>} />
        <Route path="*" element={<Page404 />} />

      </Routes>
    </Router>
  )
}

export default App


