import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';
import ProfileComponent from '../pages/userProfile/ProfileComponent';
import BlogContent from '../pages/userProfile/BlogContent';
import Blog from '../pages/userProfile/Blog';
import BlogPage from '../pages/userProfile/BlogPage';
import UserProfile from '../pages/userProfile/UserProfile';
import UserLayer from '../layer/UserLayer';

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayer />}>
        <Route index element={<Homepage />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blogpage" element={<BlogPage />} />
        {/* Include other routes as needed */}
        {/* Add private routes if necessary */}
        <Route path="*" element={<UserPrivateRoute />}>
          {/* Put the private routes inside here if required */}
          {/* Example: <Route path="profile" element={<ProfileComponent />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default UserRoute;
