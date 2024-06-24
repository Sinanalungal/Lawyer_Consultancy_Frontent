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
import Blog from '../pages/userProfile&Blog/Blog';
import BlogPage from '../pages/userProfile&Blog/BlogPage';
import BlogsView from '../pages/admin/homePages/BlogsView';
import AddSubscription from '../pages/admin/homePages/AddSubscription';
import AdminReports from '../pages/admin/homePages/Reports';
import ReportView from '../pages/admin/homePages/ReportView';


function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<DashboardComponent/>} />
        <Route path="lawyers-list" element={<LawyersComponent/>} />
        <Route path="users-list" element={<UsersComponent/>} />
        <Route path="add-lawyer" element={<AddLawyer/>} />
        <Route path="add-subscriptions" element={<AddSubscription/>} />
        <Route path="subscriptions" element={<SubscriptionPlans/>} />
        <Route path="blogs" element={<BlogsComponent/>} />
        <Route path="blog/" element={<BlogsView/>} />
        <Route path="blogpage/" element={<BlogPage/>} />
        <Route path="reports/" element={<AdminReports/>} />
        <Route path="reports-view/" element={<ReportView/>} />
        <Route path="notification" element={<NotificationComponent/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoute