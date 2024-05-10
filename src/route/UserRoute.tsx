import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';
import ProfileComponent from '../pages/userProfile/ProfileComponent';
import BlogContent from '../pages/userProfile/BlogContent';
import Blog from '../pages/userProfile/Blog';


function UserRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<UserPrivateRoute/>}>
        <Route path="" element={<Homepage/>} />
        <Route path="userprofile/" element={<ProfileComponent/>} />
        <Route path="userblog/" element={<BlogContent/>} />
        <Route path="blog/" element={<Blog/>} />
        </Route>
      </Routes>
    </>
  )
}

export default UserRoute