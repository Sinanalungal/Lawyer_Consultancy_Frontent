import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";

import BlogCard from "./BlogCard";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";





const Blog: React.FC = ({admin=false}) => {
    const { user } = useSelector((state: any) => state.login);
    const [allBlogs,setAllBlogs] = useState([])
//     const { admin } = useParams(); // Accessing the parameter 'blogId'
// console.log(admin);


    useEffect(() => {

        const fetchData = async () => {
          try {
            const axiosInstance = await getAxiosInstance(user);
            const response = await axiosInstance.get(
              BASE_URL + "blogsession/blogs/?all=True"
            );
            setAllBlogs(response.data);
            console.log(response.data);
            // setNewBlogAdded(false);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);
  return (
    <>
    {/* {admin?'':<Navbar />} */}
   <div className="w-full h-full mx-auto 2xl:container p-4">
        {(!admin)&&(<div className="w-full h-96 max-sm:h-[600px] bg-white flex   max-sm:flex-col-reverse justify-between">
            <div className="w-[50%] border border-r-2 border-r-white rounded-3xl flex-col max-sm:w-full flex justify-center items-center h-full bg-slate-800">
                <p className="text-4xl max-sm:text-2xl p-4 font-bold text-white">Take a Sippp And Dive In</p>
                <p className="font-medium sm:p-4 p-2 text-xs text-gray-200 mt-2">Discover stories and thinking and expertise from writters on any topic..</p>
                <input
                type="text"
                placeholder="What you would like to read"
                className="w-[90%] max-[400px]:mt-3 mt-1 max-sm:py-2 text-xs px-4 py-3 border border-gray-300 border-opacity-30 rounded-md focus:outline focus:outline-slate-400"
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="w-[50%] border-l-2 border border-l-white max-sm:w-full h-full rounded-3xl bg-slate-800 relative">
                <img src="/Blog post-pana.svg" className=" absolute  inset-0 w-full h-[90%] object-contain" alt="" />
            </div>
        </div>)}
        <div className="w-full p-4 mt-6 flex justify-between">
            <p  className="text-2xl text-slate-800 font-bold">Blogs</p>
            <p  className="underline font-medium text-xs flex space-x-0 justify-center items-center">View all <MdKeyboardArrowRight size={13}/></p>
        </div>
        <div className="w-full  sm:px-4 px-1 mt-2   grid md:grid-cols-3 g 2xl:grid-cols-4  grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold  items-start rounded-lg">
            {allBlogs.map((post, index) => (
                <BlogCard
                  key={index}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  content={post.content}
                  user={post.user}
                  id={post.id}
                  date={post.created_at}
                  is_liked={post.is_liked}
                  likes_count={post.likes_count}
                  is_saved={post.is_saved}
                />
          ))}
        </div>
   </div>


    </>
  );
};

export default Blog;
