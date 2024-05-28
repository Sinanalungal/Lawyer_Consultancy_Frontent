import React from 'react';
import LawyerHome from '../home/LawyerHome';
import UserProfile from '../../userProfile/UserProfile';



function LawyerProfile() {
  return (
    <LawyerHome ind={3} component={<><UserProfile/></>}/>
  );
}

export default LawyerProfile;
