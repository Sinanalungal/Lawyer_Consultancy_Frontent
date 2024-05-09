import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';
import UserProfile from '../pages/user/userProfile/UserProfile';


function UserRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<UserPrivateRoute/>}>
        <Route path="" element={<Homepage/>} />
        <Route path="userprofile/" element={<UserProfile/>} />
        </Route>
      </Routes>
    </>
  )
}

export default UserRoute