import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';
import ProfileComponent from '../pages/userProfile&Blog/ProfileComponent';
import BlogContent from '../pages/userProfile&Blog/BlogContent';
import Blog from '../pages/userProfile&Blog/Blog';
import BlogPage from '../pages/userProfile&Blog/BlogPage';
import UserProfile from '../pages/userProfile&Blog/UserProfile';
import UserLayer from '../layer/UserLayer';
import SavedBlogs from '../pages/userProfile&Blog/SavedBlogs';
import ChatComponent from '../components/chat/Chat';
import UserChat from '../pages/user/userChat/UserChat';
import LawyerList from '../pages/user/lawyerListing/LawyerList';
import SubscriptionPage from '../pages/user/subscription/SubscriptionPage';
import UserSession from '../pages/user/userSession/UserSession';

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
        {/* <Route path="subscription/:lawyerId" element={<SubscriptionPage />} /> */}
        <Route path="user-session/:lawyerId" element={<UserSession />} />
        <Route path="/chat/:lawyerId" element={<UserChat />} />

      </Route>
    </Routes>
  );
}

export default UserRoute;
