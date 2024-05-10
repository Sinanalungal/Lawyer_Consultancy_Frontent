import React from "react";
import { FaShareAlt } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";

const BlogCard: React.FC = () => {
  return (
    <>
     <div className="border shadow-md rounded-xl p-1 h-[300px]">
        <div className="w-full h-[50%] bg-slate-300 rounded-xl"></div>
        <div className=" flex  flex-col justify-between py-2 px-1 w-full h-[49%] rounded-xl ">
            <div className="justify-between p-1 h-fit rounded-xl border flex w-full">
                <p className="text-xs font-medium">25 january 2023</p>
                <p className="text-slate-800 flex space-x-2"><FaShareAlt/><CiBookmarkPlus /></p>
            </div>
            <div className="w-full  h-full  mt-1 rounded-xl">
                <p className="truncate text-lg  px-1 max-[400px]:text-md  font-bold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere dolores commodi in ipsam sapiente. Vero molestiae quas mollitia molestias! Nam repellat cumque dolorum numquam molestiae at facilis quis ad magni?</p>
                <div className="sm:h-[37px] px-1 text-gray-800 max-sm:truncate text-[9px] overflow-hidden " style={{ lineHeight: '12px' }}>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, facere laboriosam? Animi expedita natus obcaecati quaerat distinctio mollitia accusamus, exercitationem odio ab aspernatur quo maxime quam perferendis voluptas laboriosam? Dignissimos.</div>
                <div className="flex justify-between   p-1">
                    <div className="w-[50%] max-[400px]:hidden space-x-1 flex  items-center">
                        <div className="w-[20px] h-[20px] rounded-full mt-1 bg-red-300"></div>
                        <p className="truncate text-xs">yaseen...... </p>
                    </div>
                    <div className="float-right flex text-xs rounded-sm px-2 py-1 bg-slate-900 text-white  items-center">
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
