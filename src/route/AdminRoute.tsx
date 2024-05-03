import { Routes, Route } from 'react-router-dom';
import AdminPrivateRoute from './privateRouter/AdminPrivateRoute';
import AdminHome from '../pages/admin/home/AdminHome';


function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<AdminPrivateRoute/>}>
        <Route path="" element={<AdminHome/>} />
        </Route>
      </Routes>
    </>
  )
}

export default AdminRoute