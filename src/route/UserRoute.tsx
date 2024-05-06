import { Routes, Route } from 'react-router-dom';
import UserPrivateRoute from './privateRouter/UserPrivateRoute';
import Homepage from '../pages/user/Home/Homepage';


function UserRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<UserPrivateRoute/>}>
        <Route path="" element={<Homepage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default UserRoute