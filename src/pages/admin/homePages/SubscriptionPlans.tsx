import React, { useEffect, useState } from 'react';
import Table from '../../../components/table/Table';
import AdminHome from '../home/AdminHome';
import { BASE_URL } from '../../../constants';
import { getAxiosInstance } from '../../../services/axiosInstance/AxiosInstance';
import Breadcrumb from '../../../components/breadcrump/BreadCrump';

const buttonDetail = { key: 'Add Subscription Plans', label: '../add-subscriptions' };

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'billing_period', label: 'Billing Period' },
  { key: 'billing_cycle', label: 'Billing Cycle' },
  { key: 'min_price', label: 'Min Price' },
  { key: 'max_price', label: 'Max Price' },
  { key: 'features', label: 'Features' },
  { key: 'description', label: 'Description' },
];

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Admin", link: "/admin" },
  { label: "Subscriptions" },
];
type SubscriptionPlan = {
  id: number;
  name: string;
  billing_period: string; 
  billing_cycle: Number;
  min_price: string; // Assuming price is a string, if it's a number, change to number
  max_price: string;
  features: {
    help: string;
    video: string;
  };
  description: string;
};

type BreadcrumbItem = {
  label: string;
  link?: string;
};

function SubscriptionPlans() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [search, setSearch] = useState('');

  const fetchSubscriptions = async (url: string) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.get(url);
      setSubscriptions(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setTotal(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubscriptions(`${BASE_URL}subscriptions/subscription_models/?search=${search}`);
  }, [search, pageNum]);

  const data = subscriptions?.map((plans) => ({
    name: plans.name,
    billing_period:plans.billing_period,
    billing_cycle: plans.billing_cycle,
    min_price: plans.min_price,
    max_price: plans.max_price,
    features: (
      <div>
        <p>24*7 Help</p>
        <p>Video Consultation</p>
        <p>Chat with Lawyer</p>
      </div>
    ),
    description: plans.description,
  }));

  const callingNext = async () => {
    if (nextPage) {
      fetchSubscriptions(nextPage);
      setPageNum((pageNum) => pageNum + 1);
    }
  };

  const callingPrevious = async () => {
    if (prevPage) {
      fetchSubscriptions(prevPage);
      setPageNum((pageNum) => pageNum - 1);
    }
  };

  return (
    <>
      <AdminHome
        ind={3}
        component={
          <div>
            <div className="p-6 font-semibold">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="w-full flex justify-center max-sm:text-2xl text-5xl font-bold h-auto">
          Subscriptions
        </div>
        <p className="w-full flex justify-center  text-xs font-medium pb-9 h-auto mt-1">
          Subscription Data is listed in here
        </p>
            <Table
              columns={headers}
              data={data}
              itemsPerPage={15}
              buttonDetail={buttonDetail}
              search={search}
              setSearch={setSearch}
              nextButton={callingNext}
              previousButton={callingPrevious}
              pageNum={pageNum}
              total={Math.ceil(total / 5)}
            />
          </div>
        }
      />
    </>
  );
}

export default SubscriptionPlans;
