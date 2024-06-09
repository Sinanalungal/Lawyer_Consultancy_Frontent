import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import Loader from "../../components/loader/loader";
import {loadStripe,Stripe} from '@stripe/stripe-js'
import { useSelector } from "react-redux";
import Modal from "../../components/modal/Modal";


function SubscriptionPage() {
  const [lawyer, setLawyer] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loader, setLoader] = useState(true);
  const [detailModal,setDetailModal] = useState({open:false,detail:''})
  const { lawyerId } = useParams();
  const {value}=useSelector((store)=>store.login)

  useEffect(() => {
    setLoader(true);
    console.log(lawyerId);
    setLawyer(lawyerId);
  }, []);

  useEffect(() => {
    setLoader(true);
    if (lawyer) {
      async function fetchDepartmentData() {
        try {
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.post(
            `${BASE_URL}subscriptions/lawyer_plans/${lawyer}`,{user_id:value}
          );
          
          setSubscriptions(response.data);
          console.log(response.data);
          console.log(lawyer,'this is the lawyer id');   
          setLoader(false);
        } catch (error) {
          console.log(error);
          if (error.response.status == 406){
            setDetailModal({open:true,detail:error.response.data.detail})
            
          }else if (error.response.status == 404 ){
            setDetailModal({open:false,detail:error.response.data.detail})
          }
          setLoader(false);
        }
      }
      fetchDepartmentData();
    }
  }, [lawyer]);

  const handleSubscribe = async (event, subscriptionId) => {
    event.preventDefault();
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        `${BASE_URL}subscriptions/create-checkout-session/`,
        {
          subscription_id: subscriptionId,
          lawyer_id: lawyer,
          user_id:value,
        }
      );
      console.log(response.data);
      const stripePromise: Stripe | null = await loadStripe('pk_test_51PMjrqSD4LlFpJPegNLUNIVDRjJmeaF1jW7lBzhnEQHgvmchbzkNn4pVdStSwROBEnbXvF2BpC4reOqUvHS1L3Yb00sfPbm63y');
      console.log(stripePromise,'this is stripe promise');
      
      
      if(stripePromise){
        console.log(response.data);
        stripePromise.redirectToCheckout({
          sessionId: response.data,
        })
      }
      

    } catch (error) {
      console.log(error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleSubmit = async (event, subscriptionId) => {
    event.preventDefault();
    // Call handleSubscribe function to handle the subscription
    await handleSubscribe(event, subscriptionId);
  };

  return (
    <>
      {loader && <Loader width="w-full" height="min-h-screen" />}{" "}
      {!loader && (
        <div className="p-1">
          <section className="relative overflow-hidden   rounded-xl from-[#46807E] ot max-w-[1500px]  mx-auto">
            <header className=" rounded-xl">
              <div className="mx-auto max-w-screen-xl bg-slate-50 rounded-t-2xl px-4 py-8  sm:px-12 lg:px-24">
                <div className="sm:flex  sm:items-center  pb-8 border-b-2 sm:justify-between">
                  <div className="text-center mx-auto ">
                    <h1 className="text-2xl font-bold text-black sm:text-3xl">
                      Become a Legal Insider!
                    </h1>

                    <p className="mt-1.5 text-xs text-black">
                      Subscribe now for 24/7 help, video consultations, and
                      direct chat with top lawyers.🎉
                    </p>
                  </div>
                </div>
              </div>
            </header>
            {(!detailModal.open && detailModal.detail)&& <div className="min-h-[300px] items-center justify-center bg-slate-50 flex text-sm text-gray-500">{detailModal.detail}</div>}
            <div className="relative  flex mb-10 bg-slate-50 rounded-b-2xl flex-col items-center justify-center max-[400px]:px-1  px-8 py-12 mx-auto md:px-12 lg:px-16 xl:px-36 max-w-7xl lg:py-16">
              <div className="grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 gap-y-12">
                {subscriptions.map((subscription, ind) => (
                  <div key={ind}>
                    <div className="px-4 ">
                      <div className="flex items-center justify-center gap-3 text-black">
                        <p className="font-semibold text-lg  ">
                          {subscription.plan.name}
                        </p>
                      </div>
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
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
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
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
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
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path
                              d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                              strokeWidth="0"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <span>Chat with Lawyer</span>
                        </li>
                      </ul>
                      <p className="mt-6 font-mono py-2 font-bold tracking-tighter">
                        <span className="text-[25px]  text-white lg:text-[35px] ">
                          {" "}
                          {subscription.price}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {" "}
                          /{subscription.plan.billing_period}
                        </span>
                      </p>
                      <form
                        onSubmit={(event) =>
                          handleSubmit(event, subscription.id)
                        }
                      >
                        <button
                          type="submit"
                          className="rounded-lg font-semibold px-4 py-2 text-sm transition-all flex items-center justify-center text-white bg-gradient-to-b from-white/[.105] to-white/[.15] hover:to-white/[.25] h-10 ring-1 ring-inset ring-white/10 w-full"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Modal isOpen={detailModal.open} onClose={()=>{}} children={<><div className="py-6 px-2 bg-slate-200 text-lg  font-semibold rounded-md text-center">{detailModal.detail}</div></>}/>
          </section>
        </div>
      )}
    </>
  );
}

export default SubscriptionPage;

