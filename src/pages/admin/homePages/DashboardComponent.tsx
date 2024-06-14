import React, { useEffect, useState } from 'react';
import AdminHome from '../home/AdminHome';
import { FaUsers } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import axios from 'axios';
import Table from '../../../components/table/Table'; // Make sure to adjust the import path as needed
import { BASE_URL } from '../../../constants';

const DashboardComponent = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10; 
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
      const response = await axios.get(`${BASE_URL}subscriptions/ad/?search=${search}&page=${pageNum}&itemsPerPage=${itemsPerPage}`);
        setSubscriptions(response.data.results);
        setTotalPages(response.data.totalPages); 
      } catch (error) {
        console.error('Error fetching subscriptions', error);
      }
    };

    fetchSubscriptions();
  }, [search, pageNum]);

  const handleNextButton = () => {
    if (pageNum < totalPages) {
      setPageNum(prev => prev + 1);
    }
  };

  const handlePreviousButton = () => {
    if (pageNum > 1) {
      setPageNum(prev => prev - 1);
    }
  };

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'plan', label: 'Plan' },
    { key: 'start_date', label: 'Start Date' },
    { key: 'end_date', label: 'End Date' },
    { key: 'status', label: 'Status' },
    { key: 'payment_status', label: 'Payment Status' },
  ];

  const formattedData = subscriptions.map(sub => ({
    user: sub.user.email,
    plan: sub.plan.plan.name,
    start_date: new Date(sub.start_date).toLocaleDateString(),
    end_date: new Date(sub.end_date).toLocaleDateString(),
    status: sub.status,
    payment_status: sub.payment_status,
  }));

  return (
    <>
      <AdminHome ind={0} component={
        <div className='max-w-[1400px] mx-auto'>
          <div className='grid md:gap-5 grid-cols-2 lg:gap-10 mt-10 px-4 gap-4 max-[450px]:grid-cols-1 lg:grid-cols-3'>
            <div className='h-28 w-full bg-slate-200 shadow-md rounded-lg flex justify-center items-center lg:space-x-5 space-x-2 p-1'>
              <FaUsers size={40}/>
              <div className='font-bold text-xl max-sm:text-lg flex flex-col'>
                <span>Total Users</span>
                <span className='mx-auto max-sm:text-xl text-2xl'>20</span>
              </div>
            </div>
            <div className='h-28 w-full bg-slate-200 shadow-md rounded-lg flex justify-center items-center lg:space-x-5 space-x-2 p-1'>
              <GoLaw size={40}/>
              <div className='font-bold text-xl max-sm:text-lg flex flex-col'>
                <span>Total Lawyers</span>
                <span className='mx-auto max-sm:text-xl text-2xl'>20</span>
              </div>
            </div>
            <div className='h-28 w-full bg-slate-200 shadow-md rounded-lg flex justify-center items-center lg:space-x-5 space-x-2 p-1'>
              <GiMoneyStack size={40}/>
              <div className='font-bold max-sm:text-lg text-xl flex flex-col'>
                <span>Total Earned</span>
                <span className='mx-auto max-sm:text-xl text-2xl'>2000</span>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            data={formattedData}
            total={totalPages}
            previousButton={handlePreviousButton}
            nextButton={handleNextButton}
            pageNum={pageNum}
            buttonDetail={{ key: '', label: '' }} // Adjust if you need a button
            search={search}
            setSearch={setSearch}
          />
        </div>
      }/>
    </>
  );
};

export default DashboardComponent;
