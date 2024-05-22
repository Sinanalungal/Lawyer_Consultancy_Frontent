
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../user/Home/MainHeader";
import Content from "../../components/userHomeComponents/ServiceComponent";
import PlansFrontView from "../../components/plans/PlansFrontView";
import Stories from "../../components/stories/Stories";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
const LandingPage: React.FC = () => {
  const { registered , role } = useSelector((state: any) => state.register);
  const { isAuthenticated } = useSelector((store: any) => store.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (registered) {
      navigate("/register");
    }
    // if(isAuthenticated){
    const authTokens = localStorage.getItem('authTokens');

    if (isAuthenticated && authTokens){
        navigate('/login')
    }
    // }
  }, []);
  
  return (
    // <div className="homepage">
    //     <Navbar/>
    //     <div className=" homepage_elements max-sm:hidden dark:bg-black items-center relative max-lg:h-[420px] h-[600px]" style={{ backgroundImage: `url("./homepageimg.png")`, backgroundSize: "contain", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%" }}>
    //         <div className="h-[80%] md:w-[60%] sm:w-[65%] dark:text-white flex flex-col justify-center">
    //             <h1 className="font-bold text-5xl bg-white dark:bg-black  mt-4 xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //             <button type="button" className="text-white  dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //         </div>
    //         {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div> */}

    //     </div>

    //     {/* <div className="homepage_elements sm:hidden dark:bg-black items-center relative" style={{ width: "100%" }}>
    //         <div className="h-[80%] w-[100%] flex flex-col justify-center py-6">
    //             <h1 className="font-extrabold dark:bg-black dark:text-white text-4xl lg:text-5xl xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //             <div className="w-full dark:bg-black relative" style={{ backgroundImage: `url("Homepage-mobile.png")`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%", height: "600px" }}>
    //                 <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div>
    //             </div>
    //             <button type="button" className="text-white  dark:bg-white dark:text-black bg-black md:text-base  font-bold text-xs border-2 mx-6 md:mx-24 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //         </div>
    //     </div> */}
    //     <div className='sm:hidden'>
    //     <Header/>
    //     </div>
    //     <Content/>
    //     <div className=" "></div>
    // </div>

    // <div className="homepage">
    //         <Navbar/>
    //         <div className='w-full px-4  flex flex-col-reverse md:flex-row md:h-[600px]  items-center justify-center'>
    //             <div className='w-full md:w-1/2 flex flex-col justify-center  max-md:py-10'>
    //                 <h1 className="font-bold text-5xl xl:text-7xl bg-white dark:bg-black mt-4 px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
    //                 <button type="button" className="text-white dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
    //             </div>
    //             <div className='w-full md:w-1/2 h-full flex items-center'>
    //                 <img src={LawyerGif} className='object-cover' alt="" />
    //             </div>
    //         </div>

    //      <Content/>
    //      <div className=" "></div>
    // </div>
    <>
      {/* <Headers />
      <div className="homepage  flex flex-col justify-center items-center">
        <div className=" w-full px-4 flex flex-col-reverse md:flex-row md:h-[600px] items-center justify-center">
          <div className="2xl:px-auto w-full  md:w-1/2 flex flex-col justify-center max-md:py-10">
            <h1 className="font-bold text-5xl xl:text-7xl  bg-white dark:bg-black mt-4 px-6 md:px-24">
              Legal Advice Online From Top Lawyers
            </h1>
            <button
              type="button"
              className="text-white dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl"
            >
              Consult Lawyer
            </button>
          </div>
          <div className="w-full md:w-1/2 2xl:w-auto h-full flex items-center justify-center max-w-[500px] mx-auto"> {/* Added max-width and mx-auto */}
      {/* <img
              src={LawyerGif}
              className="object-cover h-[500px] w-[100%] md:h-auto md:w-auto" // Set specific height and width for the image
              alt="Lawyer Image"
            /> */}
      {/* </div>
        </div>
        <Content />
        <div className=""></div>
      </div> */}
      {!isAuthenticated && <Navbar/>}
      <Hero/>

      <Content/>
      {/* <div className='border border-opacity-30'></div> */}
      <PlansFrontView/>
      <div className="w-full p-6 2xl:container mx-auto  flex flex-col items-center  rounded-xl overflow-hidden">
        <div className="flex flex-col border-t border-b py-5 items-center space-y-2 justify-center">
          <p className="text-2xl font-medium">Success Stories</p>
          <p className="text-4xl font-bold">To Know About Our Lawyers</p>
        </div>
        <div className="flex py-16 ">
          <div className="stories-container  space-x-3  flex flex-shrink-0  ">
            <Stories
              text={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
              }
            />
            <Stories
              text={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
              }
            />
            <Stories
              text={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
              }
            />
            <Stories
              text={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
              }
            />
            <Stories
              text={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sit similique recusandae tempora quas at aperiam voluptatum blanditiis nostrum officia rem, atque quod, dignissimos fuga consequatur, iusto hic doloribus eaque."
              }
            />
            {/* <Stories />
      <Stories />
      <Stories />
      <Stories /> */}
          </div>
        </div>
      </div>

      {!isAuthenticated && <Footer/>}
    </>
  );
};

export default LandingPage;
