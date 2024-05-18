import React from 'react';
import AdminHome from '../home/AdminHome';
import Blog from '../../userProfile/Blog';



function BlogsView() {
  return (
    <>
    <AdminHome
        ind={4}
        component={<Blog admin={true}/>}/>
        
    </>
  );
}

export default BlogsView;
