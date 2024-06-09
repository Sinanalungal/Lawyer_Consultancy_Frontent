import { useEffect, useState } from "react"
import BlogCard from "./BlogCard"
import { BASE_URL } from "../../constants";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/loader";

function SavedBlogs() {
  const [blogs,setBlogs]=useState([])
  const [loader,setLoader] = useState(true)
  const { value } = useSelector((state: any) => state.login);

  useEffect(() => {
    setLoader(true)
    const fetchData = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post(
          BASE_URL + "blogsession/saved-blogs/",{'user_id':value}
        );
        setBlogs(response.data);
        console.log(response.data);
        setLoader(false)
      } catch (err) {
        console.log(err);
        setLoader(false)
      }
    };
    fetchData();
  }, []);
  return (
    <>
    {/* <div className="w-full mx-auto p-4 grid  md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
      <p className="text-3xl max-[400px]:text-2xl p-2 font-bold">Saved Blogs</p>
    </div> */}
      {loader && <Loader width="w-full" height="min-h-screen" />}

    {(!loader)&&(<>  <header className="rounded-xl">
            <div className="mx-auto max-w-screen-xl  px-4 py-8 sm:px-12 lg:px-24">
              <div className="sm:flex sm:items-center pb-8 border-b-2 sm:justify-between">
                <div className="text-center mx-auto">
                  <h1 className="text-2xl max-[400px]:text-lg font-bold text-black sm:text-3xl">
                  Saved Blogs: Your Personal Legal Library
                  </h1>
                </div>
              </div>
            </div>
          </header>

      
      {blogs.length > 0 ? (
        <div className="w-full mx-auto p-4 grid md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
        {blogs.map((post, index) => (
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
      ) : (
        <div className="h-screen w-full mx-auto p-4  sm:text-sm font-semibold sm:w-[80%]  rounded-lg  flex justify-center items-center">no saved blogs</div>
      )}</>)}
        {/* </div> */}
    </>
  )
}

export default SavedBlogs