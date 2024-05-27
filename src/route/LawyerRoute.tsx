import { Routes, Route } from 'react-router-dom';
import LawyerHome from '../pages/lawyer/home/LawyerHome';
import LawyerPrivateRoute from './privateRouter/LawyerPrivateRoute';
import DashboardComponentLawyer from '../pages/lawyer/homePages/DashboardComponent';
import ScheduledSession from '../pages/lawyer/homePages/ScheduledSession';
import LawyerSubscriptions from '../pages/lawyer/homePages/LawyerSubscription';


function LawyerRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        <Route path="" element={<DashboardComponentLawyer/>} />
        <Route path="sessions" element={<ScheduledSession/>} />
        <Route path="subscriptions" element={<LawyerSubscriptions/>} />
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoute