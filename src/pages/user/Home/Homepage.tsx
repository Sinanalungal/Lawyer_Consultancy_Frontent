import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import './Homepage.css';
import Header from '../../../components/userHomeComponents/MainHeader';
import Content from '../../../components/userHomeComponents/ServiceComponent';

const Homepage: React.FC = () => {
    const navItems = ['Home', 'About', 'Services', 'Contact'];

    return (
        <div className="homepage">
            <Navbar title="My Website" items={navItems} />
            <div className=" homepage_elements max-sm:hidden dark:bg-black items-center relative max-lg:h-[420px] h-[600px]" style={{ backgroundImage: `url("./homepageimg.png")`, backgroundSize: "contain", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%" }}>
                <div className="h-[80%] md:w-[60%] sm:w-[65%] dark:text-white flex flex-col justify-center">
                    <h1 className="font-bold text-5xl bg-white dark:bg-black  mt-4 xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
                    <button type="button" className="text-white  dark:text-black dark:bg-white bg-black md:text-base font-bold text-xs border-2 mx-6 md:mx-24 lg:mt-10 mt-5 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
                </div>
                {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div> */}

            </div>
            
            {/* <div className="homepage_elements sm:hidden dark:bg-black items-center relative" style={{ width: "100%" }}>
                <div className="h-[80%] w-[100%] flex flex-col justify-center py-6">
                    <h1 className="font-extrabold dark:bg-black dark:text-white text-4xl lg:text-5xl xl:text-7xl px-6 md:px-24">Legal Advice Online From Top Lawyers</h1>
                    <div className="w-full dark:bg-black relative" style={{ backgroundImage: `url("Homepage-mobile.png")`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPositionX: 'right', width: "100%", height: "600px" }}>
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent"></div>
                    </div>
                    <button type="button" className="text-white  dark:bg-white dark:text-black bg-black md:text-base  font-bold text-xs border-2 mx-6 md:mx-24 border-black px-5 py-3 w-40 rounded-3xl">Consult Lawyer</button>
                </div>
            </div> */}
            <div className='sm:hidden'>
            <Header/>
            </div>
            <Content/>
            <div className=" "></div>
        </div>
        
    );
};

export default Homepage;
