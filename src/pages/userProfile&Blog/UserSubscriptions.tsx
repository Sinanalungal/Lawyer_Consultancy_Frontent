import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAxiosInstance } from '../../services/axiosInstance/AxiosInstance'
import { BASE_URL } from '../../constants'
import { FaCrown } from "react-icons/fa";

function UserSubscriptions() {
    const [subscriptions, setSubscriptions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const {value}= useSelector((store)=>store.login)
    const getSubscriptions = async () => {
        setIsLoading(true)
        const axiosInstance = await getAxiosInstance()
        await axiosInstance.get(BASE_URL+'subscriptions/available-subscriptions/').then(response=>{setSubscriptions(response.data);console.log(response.data);setIsLoading(false);
        }).catch(error=>console.log(error))
    }
    useEffect(()=>{
        getSubscriptions()
        setIsLoading(false)
    },[])
  return (
    <>
     <header className="rounded-xl">
            <div className="mx-auto max-w-screen-xl  px-4 py-8 sm:px-12 lg:px-24">
              <div className="sm:flex sm:items-center pb-8 border-b-2 sm:justify-between">
                <div className="text-center mx-auto">
                  <h1 className="text-2xl max-[400px]:text-lg font-bold text-black sm:text-3xl">
                  Subscribed Plans
                  </h1>
                </div>
              </div>
            </div>
          </header>
          {subscriptions.map((subscription)=>( 

        <div className="p-2  mx-auto md:w-[80%] w-[98%] mb-2 xl:w-[50%] gap-2 max-[400px]:grid-cols-1 max-[400px]:p-5 grid grid-cols-2 rounded-md border">
          <div className='w-full h-[250px] rounded-lg bg-slate '>
            <img src={subscription.plan.lawyer.profile} className='p-1 object-contain border- border-r-gray-200 bg-white rounded-xl w-full h-full' alt="" />
          </div>
          <div className=' text-sm space-y-2 flex justify-center flex-col px-4 font-semibold'>
            <p>Lawyer Name: <span className='font-normal'>{subscription.plan.lawyer.full_name}</span></p>
            <p>Department Names: {subscription.plan.lawyer.departments.map((department) => (
                            <span key={department.id} className='bg-gray-400 ml-1 inline-block px-2  rounded-md font-semibold text-[9px]'>
                                {department.department_name}
                            </span>
                        ))}</p>            
            <p>Plan: <span className='font-normal'>{subscription.plan.plan.name}</span></p>
            <p>Plan Duration: <span className='font-normal'>{subscription.plan.plan.billing_cycle}{subscription.plan.plan.billing_period}</span></p>
            <p>Subscribed Date: <span className='font-normal'>{(new Date(subscription.created_at)).toLocaleDateString()}</span></p>
            <p>Valid Upto: <span className='font-normal'>{(new Date(subscription.end_date)).toLocaleDateString()}</span></p>
            <div className='space-x-1 flex justify-end'><p className='font-normal px-3 mt-3 py-[8px] border-blue-950 border inline-block rounded-lg'>Invoice</p>
            <p className='font-normal px-3 mt-3 py-[8px] border-blue-950 border inline-block rounded-lg'>Invoice</p>
            </div>
          </div>
          {/* <div className='bg-yellow-100'></div> */}
        </div>))}
{/* 
   {subscriptions.map((subscription)=>( <div key={subscription.id} className='sm:w-[90%]  max-sm:w-[96%] mx-auto rounded-lg max-[400px]:px-0 px-10 py-3 space-x-2 bg-yellow-400 flex max-[400px]:flex-col max-[400px]:items-star items-center'>
    
    <FaCrown size={40}/>
   <div className=' grid sm:grid-cols-2  max-sm:text-sm space-x-4 font-bold p-2 space-y-1 w-full h-full'>
    <p className=' flex pl-4'>Plan: <span className='font-normal'>{subscription.plan.plan.name}</span></p>
    <p>Subscribed Date: <span className='font-normal'>{(new Date(subscription.created_at)).toLocaleDateString()}</span></p>
    <p>Valid Upto: <span className='font-normal'>{(new Date(subscription.end_date)).toLocaleDateString()}</span></p>
    <p>Plan Duration: <span className='font-normal'>{subscription.plan.plan.billing_cycle}{subscription.plan.plan.billing_period}</span></p>


   </div>
   </div>))} */}
    </>
  )
}

export default UserSubscriptions