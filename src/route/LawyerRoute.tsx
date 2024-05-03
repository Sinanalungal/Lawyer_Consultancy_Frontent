import { Routes, Route } from 'react-router-dom';
import LawyerHome from '../pages/lawyer/home/LawyerHome';
import LawyerPrivateRoute from './privateRouter/LawyerPrivateRoute';


function LawyerRoute() {
  return (
    <>
      <Routes>
        <Route path='*' element={<LawyerPrivateRoute/>}>
        <Route path="" element={<LawyerHome/>} />
        </Route>
      </Routes>
    </>
  )
}

export default LawyerRoute