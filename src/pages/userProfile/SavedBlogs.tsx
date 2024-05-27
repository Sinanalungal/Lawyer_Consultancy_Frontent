import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import { BASE_URL } from "../../constants";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { useSelector } from "react-redux";

function SavedBlogs() {
  const [blogs,setBlogs]=useState([])
  const { value } = useSelector((state: any) => state.login);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post(
          BASE_URL + "blogsession/saved-blogs/",{'user_id':value}
        );
        setBlogs(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <div className="w-full mx-auto p-4 grid  md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
      <p className="text-3xl max-[400px]:text-2xl p-2 font-bold">Saved Blogs</p>
    </div>
      <div className="w-full mx-auto p-4 grid md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
          {blogs.map((post, index) => (
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
    </>
  )
}

export default SavedBlogs