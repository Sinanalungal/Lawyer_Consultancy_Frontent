import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import Loader from "../../components/loader/loader";

function SubscriptionPage() {
  const [lawyer,setLawyer] = useState<any>(null)
  const [subscriptions,setSubscriptions] = useState([])
  const [loader,setLoader] = useState(true)
  const { lawyerId } = useParams();
  useEffect(()=>{
    setLoader(true)
    console.log(lawyerId);
    setLawyer(lawyerId)
  },[])
  useEffect(() =>{
    
    setLoader(true)
    if(lawyer){
      async function fetchDepartmentData() {
        try {
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.get(`${BASE_URL}subscriptions/lawyer_plans/${lawyer}`);
          setSubscriptions(response.data);
          console.log(response.data);
          setLoader(false)
        } catch (error) {
          console.log(error);
          setLoader(false)
        }
      }
      fetchDepartmentData();
    }
  
  },[lawyer])
console.log(subscriptions);

  return (
    <>
        {loader && <Loader width="w-full" height="min-h-screen" />}{" "}

      {!loader && (<div className="p-1">
      <section className="relative overflow-hidden   rounded-xl from-[#46807E] ot max-w-[1500px]  mx-auto">
        <header className=" rounded-xl">
          <div className="mx-auto max-w-screen-xl bg-slate-50 px-4 py-8  sm:px-12 lg:px-24">
            <div className="sm:flex  sm:items-center  pb-8 border-b-2 sm:justify-between">
              <div className="text-center mx-auto ">
                <h1 className="text-2xl font-bold text-black sm:text-3xl">
                  Become a Legal Insider!
                </h1>

                <p className="mt-1.5 text-xs text-black">
                  Subscribe now for 24/7 help, video consultations, and direct
                  chat with top lawyers.🎉
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="relative  flex mb-10 bg-slate-50 flex-col items-center justify-center max-[400px]:px-1  px-8 py-12 mx-auto md:px-12 lg:px-16 xl:px-36 max-w-7xl lg:py-16">
          <div className="grid  grid-cols-1 gap-6 lg lg:grid-cols-3 gap-y-12">
            
            {subscriptions.map((subscription,ind)=>(<div key={ind}>
              <div className="px-4 ">
                <div className="flex items-center gap-3 text-black">
                  {/* <div className="text-5xl">✺</div> */}
                  <p className="font-mono text-lg font-medium">{subscription.plan.name}</p>
                </div>
                <p className="mt-6 text-xs h-[100px] overflow-hidden   mb-2  font-light text-black">
                  {subscription.plan.description}
                </p>
              </div>
              <div className="p-8 mt-4 shadow-2xl lg:shadow-black rounded-xl bg-gray-900 backdrop-blur-xl border-white/5 ring-1 ring-white/10">
              <ul
                  className="flex flex-col max-sm:text-xs text-[13px] text-gray-400 gap-y-3"
                  role="list"
                >
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        strokeWidth="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>24*7 Help</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        strokeWidth="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Video Consultation</span>
                  </li>
                  <li className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-white icon icon-tabler icon-tabler-circle-check-filled"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        strokeWidth="0"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span>Chat with Lawyer</span>
                  </li>
                </ul>
                <p className="mt-6 font-mono font-bold tracking-tighter">
                  <span className="text-4xl text-white lg:text-[35px] "> {subscription.price}</span>
                  <span className="text-xs font-medium text-gray-500">
                    {" "}
                    /{subscription.plan.billing_period}
                  </span>
                </p>
                <div className="flex mt-6 lg:mt-12">
                  <a
                    className="rounded-lg font-semibold px-4 py-2 text-sm transition-all flex items-center justify-center text-white bg-gradient-to-b from-white/[.105] to-white/[.15] hover:to-white/[.25] h-10 ring-1 ring-inset ring-white/10 w-full"
                    href="#_"
                    aria-describedby="#_"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
            </div>))}
            
          </div>
        </div>
        {/* <div className="absolute w-full h-28 bg-black -mt-24  max-w-[1500px]  mx-auto"></div> */}
      </section>
      </div>
      )}
    </>
  );
}

export default SubscriptionPage;
