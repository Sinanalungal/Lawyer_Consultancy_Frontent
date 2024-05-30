import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';
import ProfileComponent from '../pages/userProfile/ProfileComponent';
import BlogContent from '../pages/userProfile/BlogContent';
import Blog from '../pages/userProfile/Blog';
import BlogPage from '../pages/userProfile/BlogPage';
import UserProfile from '../pages/userProfile/UserProfile';
import UserLayer from '../layer/UserLayer';
import SavedBlogs from '../pages/userProfile/SavedBlogs';
import LawyerList from '../pages/userProfile/LawyerList';
import SubscriptionPage from '../pages/userProfile/SubscriptionPage';

function UserRoute() {
  return (
    <Routes>
      <Route path="/" element={<UserLayer />}>
        <Route index element={<Homepage />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blogpage" element={<BlogPage />} />
     
        <Route path="saved-blogs" element={<SavedBlogs />} />
        <Route path="lawyer-list" element={<LawyerList />} />
        <Route path="subscription/:lawyerId" element={<SubscriptionPage />} />
        {/* <Route path="Subscription/" element={<SubscriptionPage />} /> */}
      </Route>
    </Routes>
  );
}

export default UserRoute;
