import DiscussionSection from "../../components/comment/Comment";
import Navbar from "../../components/navbar/Navbar";
import { BiSolidLike } from "react-icons/bi";
import { CiBookmarkPlus } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { MdBookmarkAdded } from "react-icons/md";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BlogPage: React.FC = () => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<any[]>([]);
  // const [newCommentAdded, setNewCommentAdded] = useState<boolean>(false)
  const [liked,setLiked] = useState({liked: false,count:0})
  const [saved,setSaved] = useState({saved: false,count:0})
  const location = useLocation();
  const navigate = useNavigate()
  const {
    title,
    description,
    image,
    mainContent,
    bloguser,
    blogId,
    blogDate,
    // commentsCount,
    is_liked,
    likes_count,
    is_saved,
    profile
  } = location.state;
  const { value, user } = useSelector((state: any) => state.login);
  useEffect(()=>{
    setLiked(is_liked)
    setSaved(is_saved)
    // setAllComments()
  },[])

  const addingComment = async () => {
    try {
      const axiosInstance = await getAxiosInstance(user);
      const response = await axiosInstance.post(
        BASE_URL + "blogsession/comments/",
        { user: value, content: comment, blog: blogId }
      );
      console.log(response.data);
      if (response.status == 201){
        toast.success("comment added successfully");
        setAllComments([...allComments,response.data])
        // setNewCommentAdded(true);
      }else{
        toast.error("comment not added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  

  const likeOrUnlike = async()=>{
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        BASE_URL + "blogsession/likes/",
        { user: value, blog: blogId }
      );
      console.log(response.data);
      setLiked(response.data.like)
      
    } catch (err) {
      console.log(err);
    }
  }
  const SavedOrUnsaved = async()=>{
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        BASE_URL + "blogsession/saved/",
        { user: value, blog: blogId }
      );
      console.log(response.data);
      setSaved(response.data.saved)
      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          BASE_URL + `blogsession/comments/?blog_id=${blogId}`,
        );

        console.log(response.data);
        setAllComments(response.data);
        // setNewCommentAdded(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments()
    window.scrollTo(0, 0);
  },[])

 
  console.log(comment);
  const comments = allComments.map((comment) => ({
    
    id: comment.id,
    author: comment.user,
    avatar: comment.profile, 
    date: comment.created_at, 
    content: comment.content, 
  }));
  
  return (
    <>
      {/* <Navbar /> */}
      <div className="sm:p-10 p-4 2xl:w-full lg:px-52 2xl:container mx-auto">
        <div className="w-full min-h-screen ">
          <p className="sm:text-5xl w-full break-words max-[400px]:text-2xl text-3xl font-semibold">
            {title}
          </p>
          <div className="w-full space-x-3 flex items-center mt-3 py-3 sm:py-7 border-b ">
            <img src={`${BASE_URL}${profile}`} className="w-[50px] max-[400px]:min-w-[40px] max-[400px]:h-[40px] h-[50px] bg-black rounded-full"/>
            <div className="flex h-full w-full  flex-col space-y-1">
              <p className="w-full truncate   break-words font-semibold text-sm max-[400px]:text-xs">
                {bloguser}
              </p>
              <p className="font-semibold break-words text-xs max-[400px]:text-[10px] text-gray-600 ">
                {blogDate}
              </p>
            </div>
          </div>
          <hr />
          <div className="w-full flex justify-center py-7">
            <img
              src={image}
              className="rounded-xl  2xl:object-cover 2xl:h-[800px]"
              alt=""
            />
          </div>
          <div className=" max-sm:px-2 p-7   xl:text-base sm:text-sm   text-xs">
            <blockquote className="text-xl max-[400px]:text-base italic font-semibold text-gray-900 dark:text-white">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
              <p className="break-words">{description}</p>
            </blockquote>
          </div>

          <div
            className="px-1  xl:text-base sm:text-sm text-xs"
            dangerouslySetInnerHTML={{ __html: mainContent }}
          ></div>
          {/* <hr  className="mt-10 "/>
        <hr  className="mt-10 "/> */}
          <div className="w-full  rounded-md mt-10 flex justify-end border">
            <div className="flex p-6 space-x-3">
            {saved ?<MdBookmarkAdded  onClick={()=>SavedOrUnsaved()}  className="cursor-pointer" size={25} />:<CiBookmarkPlus onClick={()=>SavedOrUnsaved()} className="cursor-pointer" size={25} />}
              {/* <CiBookmarkPlus  className="cursor-pointer" size={25} /> */}
              {liked ?<BiSolidLike onClick={()=>likeOrUnlike()}  className="cursor-pointer" size={25} />:<AiOutlineLike onClick={()=>likeOrUnlike()} className="cursor-pointer" size={25} />}
            </div>
          </div>

          {/* <div className="w-full border-2  sm:px-4 px-1 mt-10  sm:text-sm font-semibold  flex-col rounded-lg"> */}
          {/* <p className="text-2xl p-6 font-semibold ">Comments</p> */}
          <DiscussionSection
            comments={comments}
            addComment={setComment}
            commentdata={comment}
            submitFunction={addingComment}
          />
          {/* </div> */}
          {/* <p className="text-2xl p-6 font-semibold ">Recommended Blogs</p>
        <div className="w-full  sm:px-4 px-1 mt-2  grid md:grid-cols-3 g 2xl:grid-cols-4  grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold  items-start rounded-lg">
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
