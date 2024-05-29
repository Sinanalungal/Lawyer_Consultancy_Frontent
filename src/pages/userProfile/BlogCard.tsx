import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import {  useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { TbNotesOff } from "react-icons/tb";
import { BASE_URL } from "../../constants";



interface BlogCardProps {
    title: string;
    description: string;
    image: string;
    content: string;
    user: string;
    date: string;
    id: number;
    is_liked: boolean;
    likes_count: number;
    is_saved: boolean;
    valid:boolean;
    checked: boolean;
    profile: string;
  }
  
const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  content,
  user,
  date,
  id,
  is_liked,
  likes_count,
  is_saved,
  valid,
  checked,
  profile
}) => {
  const navigate = useNavigate();
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    year: "numeric",
    month: "long",

  });
  console.log({ title, description, image, content, user, date, id ,is_liked , likes_count,is_saved,valid ,checked,profile});

  return (
    <>
      <div className="border shadow-md rounded-xl p-1 3xl:h-[600px] h-[300px]">
        <div className="w-full relative h-[50%] 3xl:h-[70%] rounded-xl">
          <div className="absolute right-0 bg-white">{(!checked)&&<MdOutlinePendingActions className="m-1 text-yellow-600" size={17}/>}{checked&&(!valid)&&<TbNotesOff size={17} className="m-1 text-red-900"/>}</div>
          <img src={image} className="w-full h-full rounded-xl object-cover" alt="" />
        </div>
        <div className=" flex  flex-col justify-between py-2 px-1 w-full h-[49%] rounded-xl ">
          <div className="justify-between p-1 h-fit rounded-xl border flex w-full">
            <p className="text-xs font-medium">{formattedDate}</p>
            <p className="text-slate-800 flex space-x-2">
              <FaShareAlt />
              {is_saved?<MdBookmarkAdded/>:<CiBookmarkPlus />}
            </p>
          </div>
          <div className="w-full  h-full flex flex-col justify-between mt-1 rounded-xl">
            <p className="truncate text-lg  px-1 max-[400px]:text-md  font-bold">
              {title}
            </p>
            <div
              className="sm:h-[37px] px-1 text-gray-800 max-sm:truncate text-[9px] overflow-hidden "
              style={{ lineHeight: "12px" }}
            >
              {" "}
              {description}
            </div>
            <div className="flex justify-between   p-1">
              <div className="w-[50%] max-[400px]:hidden space-x-1 flex  items-center">
                {user ? (
                  <>
                      <img src={`${BASE_URL}${profile}`} className="object-cover w-[20px] h-[20px] rounded-full mt-1 bg-red-300" alt="" />
                    {/* <div className="min-w-[20px] min-h-[20px] rounded-full mt-1 bg-red-300">
                    </div> */}
                    <p className="truncate text-xs">{user}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div
                onClick={() =>
                  navigate("../blogpage", {
                    state: {
                      title: title,
                      description: description,
                      image: image,
                      mainContent: content,
                      bloguser: user,
                      blogId: id,
                      blogDate: formattedDate,
                      is_liked: is_liked,
                      likes_count: likes_count,
                      is_saved:is_saved ,
                      profile : profile 
                    },
                  })
                }
                className="cursor-pointer float-right flex text-xs rounded-sm px-2 py-1 bg-slate-900 text-white items-center"
              >
                Read..
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
