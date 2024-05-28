import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import Table from '../../../components/table/Table';
import LawyerHome from '../home/LawyerHome';
import { getAxiosInstance } from '../../../services/axiosInstance/AxiosInstance';
import { BASE_URL } from '../../../constants';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../../components/breadcrump/BreadCrump';
import { toast } from 'react-toastify';

const buttonDetail = { key: 'Add Subscription Plans', label: '../add-subscriptions' };

const headers = [
  { key: 'name', label: 'Plan Name' },
  { key: 'billing_period', label: 'Billing Period' },
  { key: 'billing_cycle', label: 'Billing Cycle' },
  { key: 'price', label: 'Price' },
  { key: 'features', label: 'Features' },
  { key: 'status', label: 'Status' },
  { key: 'valid', label: 'Change Status' },
];

function LawyerSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState('');
  const [valid,setValid] = useState<any>('all');
  const { value } = useSelector((store: any) => store.login);

  const fetchSubscriptions = async (url: string) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.get(url);
      setSubscriptions(response.data.results);
      console.log(response.data.results);
      
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotal(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubscriptions(`${BASE_URL}subscriptions/lawyer_subscription_plans/?id=${value}&search=${search}&page=${pageNum}&valid=${valid}`);
  }, [search, pageNum, valid]);

  const changeStatus = async (subscriptionId, planId) => {
    const data = {
      subscription_id: subscriptionId,
      plan_id: planId,
      lawyer_id: value
    };
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.patch(`${BASE_URL}subscriptions/lawyer_subscription_plans/`, data);
      console.log(response);

      // Update local state with the new data
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.map(sub => 
          sub.id === response.data.id ? response.data : sub
        )
      );

      toast.success('Status Updated Successfully');
    } catch (error) {
      toast.error(error.response.data.error);
      console.error('Error updating subscription plan:', error);
    }
  };

  const data = subscriptions?.map((plans) => ({
    name: plans.plan.name,
    billing_period: plans.plan.billing_period,
    billing_cycle: plans.plan.billing_cycle,
    price: plans.price,
    features: (
      <div>
        <p>24*7 Help</p>
        <p>Video Consultation</p>
        <p>Chat with Lawyer</p>
      </div>
    ),
    valid: (plans.valid) ? (
      <div onClick={() => changeStatus(plans.id, plans.plan.id)} className='py-2 px-3 bg-red-900 inline-block rounded-2xl text-white'>Invalid</div>
    ) : (
      <div onClick={() => changeStatus(plans.id, plans.plan.id)} className='py-2 px-3 inline-block rounded-2xl bg-green-800 text-white'>Valid</div>
    ),
    status:(plans.valid) ? (
      <p>Valid</p>
    ) : (
      <p>Invalid</p>
    )
  }));

  const callingNext = () => {
    if (nextPage) {
      setPageNum(pageNum + 1);
    }
  };

  const callingPrevious = () => {
    if (prevPage) {
      setPageNum(pageNum - 1);
    }
  };

  type BreadcrumbItem = {
    label: string;
    link?: string;
  };
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Lawyer", link: "/lawyer" },
    { label: "Subscriptions" },
  ];

  return (
    <LawyerHome ind={2} component={
      <>
        <div className="p-6 font-semibold">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className='w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto'>
          Subscriptions
        </div>
        <div className="px-7 max-sm:px-2 py-1">
          <div className="text-xs flex items-center font-bold rounded-md space-x-1">
            <div
              className={`${
                valid == 'all' && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer`}
              onClick={() => setValid("all")}
            >
              all
            </div>
            <div
              className={`${
                valid == true && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer `}
              onClick={() => setValid(true)}
            >
              Valid
            </div>
            <div
              className={`${
                valid == false && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer`}
              onClick={() => setValid(false)}
            >
              Invalid
            </div>
          </div>
        </div>
        <Table 
          columns={headers} 
          data={data} 
          itemsPerPage={10} 
          buttonDetail={buttonDetail}
          nextButton={callingNext}
          previousButton={callingPrevious}
          search={search}
          setSearch={setSearch}
          pageNum={pageNum}
          total={Math.ceil(total / 10)}
        />
      </>
    } />
  )
}

export default LawyerSubscriptions;
