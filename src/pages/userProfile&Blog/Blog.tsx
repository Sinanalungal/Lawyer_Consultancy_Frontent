import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";

import BlogCard from "./BlogCard";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";

const Blog: React.FC = ({ admin = false }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    const fetchData = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          BASE_URL + "blogsession/blogs/?all=True"
        );
        setAllBlogs(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loader && <Loader width="w-full" height="min-h-screen" />}

      {!loader && (
        <div className="w-full h-full mx-auto 2xl:container p-4">
          <header className="rounded-xl">
            <div className="mx-auto max-w-screen-xl  px-4 py-8 sm:px-12 lg:px-24">
              <div className="sm:flex sm:items-center pb-8 border-b-2 sm:justify-between">
                <div className="text-center mx-auto">
                  <h1 className="text-2xl max-[400px]:text-lg font-bold text-black sm:text-3xl">
                    Stay Informed: Your Guide to Legal Matters
                  </h1>
                </div>
              </div>
            </div>
          </header>
          <div className="w-full sm:px-4  px-1 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  gap-4 sm:text-sm font-semibold items-start rounded-lg">
            {allBlogs.map((post, index) => (
              <BlogCard
                key={index}
                title={post.title}
                description={post.description}
                image={post.image}
                content={post.content}
                user={post.user.full_name}
                profile={post.user.profile}
                id={post.id}
                date={post.created_at}
                is_liked={post.is_liked}
                likes_count={post.likes_count}
                is_saved={post.is_saved}
                checked={post.checked}
                valid={post.valid}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
