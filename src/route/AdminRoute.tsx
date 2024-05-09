import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './privateRouter/AdminPrivateRoute';
import AdminHome from '../pages/admin/home/AdminHome';
import AddLawyer from '../pages/admin/homePages/AddLawyer';
import DashboardComponent from '../pages/admin/homePages/DashboardComponent';
import LawyersComponent from '../pages/admin/homePages/LawyersComponent';
import UsersComponent from '../pages/admin/homePages/UsersComponent';
import SubscriptionPlans from '../pages/admin/homePages/SubscriptionPlans';
import BlogsComponent from '../pages/admin/homePages/BlogsComponent';
import NotificationComponent from '../pages/admin/homePages/NotificationComponent';


function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<DashboardComponent/>} />
        <Route path="lawyers-list" element={<LawyersComponent/>} />
        <Route path="users-list" element={<UsersComponent/>} />
        <Route path="addlawyer" element={<AddLawyer/>} />
        <Route path="subscriptions" element={<SubscriptionPlans/>} />
        <Route path="blogs" element={<BlogsComponent/>} />
        <Route path="notification" element={<NotificationComponent/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoute