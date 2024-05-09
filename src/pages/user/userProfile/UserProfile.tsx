import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import SocialMediaCard from '../../../components/userProfileComponents/SocialMediaCard';

function UserProfile() {
  return (
    <>
      <Navbar />
      <div className='h-full w-full p-6 mt-6 flex items-center flex-col justify-center'>
        <SocialMediaCard/>
        {/* <hr />
        hidfidf
        <hr /> */}
      </div>
    </>
  );
}

export default UserProfile;
