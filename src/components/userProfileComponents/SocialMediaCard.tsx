import { MdIosShare } from "react-icons/md";

const SocialMediaCard: React.FC = () => {
  return (
    <>
      <div className='w-full p-4 md:px-12 md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start bg-gray-100 rounded-3xl'>
        <div className='sm:min-w-[150px] min-h-[100px] min-w-[100px] sm:min-h-[150px] max-md:p-2 md:my-auto bg-black rounded-full'></div>
        <div className='flex-grow w-full sm:w-[80%] p-4 '>
          <div className='flex space-y-4 justify-between space-x-1 flex-wrap w-full max-sm:mx-auto items-end mb-2'>
            <p className='text-3xl truncate max-sm:text-xl font-bold'>Jennifer_Lopez</p>
            <div className='max-md:hidden  flex  space-x-1'>
              <div className='px-5 py-2  bg-slate-800 flex justify-center items-center text-xs text-white rounded-full'>follow</div>
              <div className='px-3 py-2 border border-slate-800 flex justify-center items-center text-xs text-black rounded-full'><MdIosShare size={15}/></div>
            </div>
          </div>
          <div className='w-full py-5 flex space-x-7 max-[400px]:text-xs sm:ml-4'>
            <div className='max-w-[100px]  h-full justify-center items-start flex flex-col text-center'>
              <p className='font-bold'>Blogs</p>
              <p className='text-lg max-[400px]:text-sm font-bold'>100</p>
            </div>
            <div className='max-w-[100px] h-full justify-center items-start flex flex-col text-center'>
              <p className='font-bold'>Followers</p>
              <p className='text-lg max-[400px]:text-sm font-bold'>10</p>
            </div>
          </div>
          <p className='text-xs md:text-sm'>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
            of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
            a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
          </p>
        </div>
        <div className='md:hidden p-2 flex space-x-1'>
          <div className='px-5 py-2 bg-slate-800 flex justify-center items-center text-xs text-white rounded-full'>follow</div>
          <div className='px-3 py-2 border border-slate-800 flex justify-center items-center text-xs text-black rounded-full'><MdIosShare size={15}/></div>
        </div>
      </div>
      </>
  );
};

export default SocialMediaCard;
