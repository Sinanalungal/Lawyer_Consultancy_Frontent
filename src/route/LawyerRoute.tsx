import { Routes, Route } from 'react-router-dom';
import LawyerPrivateRoute from './privateRouter/LawyerPrivateRoute';
import DashboardComponentLawyer from '../pages/lawyer/homePages/DashboardComponent';
import ScheduledSession from '../pages/lawyer/homePages/ScheduledSession';
import LawyerSubscriptions from '../pages/lawyer/homePages/LawyerSubscription';
import LawyerProfile from '../pages/lawyer/homePages/LawyerProfile';
import LawyerSavedBlogs from '../pages/lawyer/homePages/LawyerSavedBlogs';
import AddLawyerSubscription from '../pages/lawyer/homePages/AddLawyerSubscription';


function LawyerRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        <Route path="" element={<DashboardComponentLawyer/>} />
        <Route path="sessions" element={<ScheduledSession/>} />
        <Route path="subscriptions" element={<LawyerSubscriptions/>} />
        <Route path="profile" element={<LawyerProfile/>} />
        <Route path="saved-blogs" element={<LawyerSavedBlogs/>} />
        <Route path="add-subscriptions" element={<AddLawyerSubscription/>} />
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoute