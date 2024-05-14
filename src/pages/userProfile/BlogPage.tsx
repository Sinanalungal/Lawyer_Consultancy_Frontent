import DiscussionSection from "../../components/comment/Comment";
import Navbar from "../../components/navbar/Navbar";
import BlogCard from "./BlogCard";
import { CiBookmarkPlus } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";



const BlogPage: React.FC = () => {
  const comments = [
    {
      id: 1,
      author: 'Michael Gough',
      avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
      date: '2022-02-08',
      content: 'Very straight-to-point article. Really worth time reading. Thank you!',
    },
    {
      id: 2,
      author: 'Jese Leos',
      avatar: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
      date: '2022-02-12',
      content: 'Much appreciated! Glad you liked it ☺️',
    },
    {
      id: 3,
      author: 'Bonnie Green',
      avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
      date: '2022-03-12',
      content: 'The article covers the essentials, challenges, myths and stages the UX designer should consider.',
    },
    {
      id: 4,
      author: 'Helene Engels',
      avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
      date: '2022-06-23',
      content: 'Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.',
    },
  ];
  return (
    <>
    <Navbar/>
    <div className="sm:p-10 p-4 2xl:w-full 2xl:container mx-auto" >
      <div className="w-full min-h-screen ">
        <p className="sm:text-5xl max-[400px]:text-2xl text-3xl font-semibold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed labore quis molestias, dolores </p>
        <div className="w-full space-x-3 flex items-center mt-3 py-3 sm:py-7 border-b px-1">
          <div className="w-[50px] max-[400px]:w-[40px] max-[400px]:h-[40px] h-[50px] bg-black rounded-full"></div>
          <div className="flex h-full  flex-col space-y-1">
            <p className="font-semibold text-sm max-[400px]:text-xs">John Brittas</p>
            <p className="font-semibold text-xs max-[400px]:text-[10px] text-gray-600 ">19 jan 2024</p>
          </div>
        </div>
        <hr />
        <div className="w-full flex justify-center py-7">
         <img src="/homepagemobile.jpg" className="rounded-xl  2xl:object-cover 2xl:h-[800px]" alt="" />
        </div>
        <div className="px-1 xl:text-base sm:text-sm   text-xs"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit modi voluptate ex qui officia eligendi, dolor natus blanditiis aperiam, eius vel distinctio? Quisquam placeat veritatis vitae rem vero nam optio.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem eligendi libero, vitae, mollitia laudantium commodi ipsam ipsa consequuntur tempora non suscipit quae provident excepturi facilis alias minima eum iusto fugit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint neque minus perspiciatis fugit eligendi molestias aliquam vel deleniti error nulla voluptates, nihil ea! Necessitatibus, nesciunt. Praesentium, reprehenderit! Eveniet, tempora illo? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolores dicta amet consectetur laudantium minus totam quisquam culpa, minima quaerat dolorem qui praesentium laboriosam deserunt, non ratione, autem suscipit ut. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit nulla nihil id. Iusto voluptatum qui optio molestias itaque sint tempora excepturi necessitatibus at beatae, repellat voluptas. Maxime exercitationem ab aspernatur?</p></div>
        {/* <hr  className="mt-10 "/>
        <hr  className="mt-10 "/> */}
        <div className="w-full  rounded-md mt-10 flex justify-end border">
          <div className="flex p-6 space-x-3">
          <CiBookmarkPlus className="cursor-pointer" size={25}/>
          <AiOutlineLike className="cursor-pointer" size={25}/>

          </div>
        </div>

        {/* <div className="w-full border-2  sm:px-4 px-1 mt-10  sm:text-sm font-semibold  flex-col rounded-lg"> */}
          {/* <p className="text-2xl p-6 font-semibold ">Comments</p> */}
          <DiscussionSection comments={comments} />
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
