import React from "react";
import { FaPlus } from "react-icons/fa";
import UserProfile from "./UserProfile";
import BlogCard from "./BlogCard";

const BlogContent: React.FC = () => {
  return (
    <>
      <UserProfile index={2}
        component={
          <>
            <div className="w-full mx-auto  p-4 flex flex-col justify-center space-y-3 sm:text-sm font-semibold sm:w-[80%] items-end rounded-lg">
              <div className="sm:px-5 px-3 py-2 space-x-1  bg-slate-800 flex justify-center items-center text-xs text-white rounded-full">
                <p>Add Blog</p> <FaPlus size={10} />
              </div>
            {/* <input
              type="text"
              placeholder="Search..."
              className="w-full  text-xs px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
            /> */}
            </div>
            <div className="w-full mx-auto p-4 grid md:grid-cols-3 2xl:grid-cols-4  grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
          </>
        }
      />
    </>
  );
};

export default BlogContent;
