import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../../components/breadcrump/BreadCrump';
import AdminHome from '../home/AdminHome';
import { getAxiosInstance } from '../../../services/axiosInstance/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import Select from 'react-select';

const AddSubscription = () => {
  const navigate = useNavigate();
  const [billingCycleOptions, setBillingCycleOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      billingCycle: '',
      minPrice: '',
      maxPrice: '',
      description: '',
      billingPeriod: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Subscription Name is required'),
      billingPeriod: Yup.string().required('Billing Period is required'),
      billingCycle: Yup.string().required('Billing Cycle is required'),
      minPrice: Yup.number().required('Min Price is required').min(0, 'Min Price must be at least 0'),
      maxPrice: Yup.number().required('Max Price is required').min(
        Yup.ref('minPrice'),
        'Max Price must be greater than Min Price'
      ),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      const axiosInstance = await getAxiosInstance();
      const data = {
        name: values.name,
        billing_cycle: values.billingCycle,
        min_price: values.minPrice,
        max_price: values.maxPrice,
        description: values.description,
        billing_period: values.billingPeriod,
      };

      try {
        const response = await axiosInstance.post(`${BASE_URL}subscriptions/subscription_models/`, data);
        console.log(response);
        navigate('../subscriptions');
      } catch (error) {
        console.error('Error creating subscription plan:', error);
      }
    },
  });

  const handleBillingPeriodChange = (selectedOption) => {
    formik.setFieldValue('billingPeriod', selectedOption.value);
    formik.setFieldError('billingPeriod', '');
    formik.setFieldValue('billingCycle', ''); // Reset billing cycle
    formik.setFieldError('billingCycle', '');
    const options = [];
    switch (selectedOption.value) {
      case 'day':
        for (let i = 1; i <= 30; i++) {
          options.push({ value: i, label: `${i}` });
        }
        break;
      case 'month':
        for (let i = 1; i <= 12; i++) {
          options.push({ value: i, label: `${i}` });
        }
        break;
      case 'year':
        for (let i = 1; i <= 10; i++) {
          options.push({ value: i, label: `${i}` });
        }
        break;
      default:
        break;
    }
    setBillingCycleOptions(options);
  };

  const handleBillingCycleChange = (selectedOption) => {
    formik.setFieldValue('billingCycle', selectedOption.value);
    formik.setFieldError('billingCycle', '');
  };

  const breadcrumbItems = [
    { label: 'Admin', link: '../../' },
    { label: 'Subscriptions', link: '../' },
    { label: 'Add Subscription' },
  ];

  const billingPeriodOptions = [
    { value: 'day', label: 'Day' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  return (
    <>
      <AdminHome
        ind={1}
        component={
          <div className="w-full p-6 flex flex-col min-h-screen">
            <div className="font-semibold py-2">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <form onSubmit={formik.handleSubmit} className="w-full space-y-2 font-semibold p-4">
              <div className="max-[400px]:flex w-full justify-end hidden text-xs space-x-1">
                <button type="button" onClick={() => navigate('../')} className="bg-white border p-2 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="bg-slate-700 border px-2 p-1 text-white rounded-md">
                  Add
                </button>
              </div>
              <div className="w-full mt-10 border bg-slate-50 rounded-md border-t p-3 flex justify-between">
                <div>
                  <p className="text-xl font-semibold">Add Subscriptions</p>
                  <p className="text-[11px] mt-1 font-normal text-gray-700">Add Subscription In Here</p>
                </div>
                <div className="flex max-[400px]:hidden text-xs p-2 space-x-1">
                  <button type="button" onClick={() => navigate('../')} className="bg-white border p-2 rounded-md">
                    Cancel
                  </button>
                  <button type="submit" className="bg-slate-700 border px-2 p-1 text-white rounded-md">
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-col pt-5 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Subscription Name</p>
                  <div className="flex w-full flex-col">
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full h-10 px-3 py-2 border rounded-md ${
                        formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-xs">{formik.errors.name}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Billing Period</p>
                  <div className="flex w-full flex-col">
                    <Select
                      id="billingPeriod"
                      name="billingPeriod"
                      options={billingPeriodOptions}
                      onChange={handleBillingPeriodChange}
                      onBlur={formik.handleBlur}
                      value={billingPeriodOptions.find(option => option.value === formik.values.billingPeriod)}
                      className="block w-full rounded-md text-xs mt-1"
                    />
                    {formik.touched.billingPeriod && formik.errors.billingPeriod && (
                      <div className="text-red-500 text-xs">{formik.errors.billingPeriod}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Billing Cycle</p>
                  <div className="flex w-full flex-col">
                    <Select
                      id="billingCycle"
                      name="billingCycle"
                      options={billingCycleOptions}
                      onChange={handleBillingCycleChange}
                      onBlur={formik.handleBlur}
                      value={billingCycleOptions.find(option => option.value === formik.values.billingCycle)}
                      className="block w-full rounded-md text-xs mt-1"
                    />
                    {formik.touched.billingCycle && formik.errors.billingCycle && (
                      <div className="text-red-500 text-xs">{formik.errors.billingCycle}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Min Price</p>
                  <div className="flex w-full flex-col">
                    <input
                      type="number"
                      name="minPrice"
                      value={formik.values.minPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full h-10 px-3 py-2 border rounded-md ${
                        formik.touched.minPrice && formik.errors.minPrice ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500`}
                    />
                    {formik.touched.minPrice && formik.errors.minPrice && (
                      <div className="text-red-500 text-xs">{formik.errors.minPrice}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Max Price</p>
                  <div className="flex w-full flex-col">
                    <input
                      type="number"
                      name="maxPrice"
                      value={formik.values.maxPrice}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full h-10 px-3 py-2 border rounded-md ${
                        formik.touched.maxPrice && formik.errors.maxPrice ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500`}
                    />
                    {formik.touched.maxPrice && formik.errors.maxPrice && (
                      <div className="text-red-500 text-xs">{formik.errors.maxPrice}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Description</p>
                  <div className="flex w-full flex-col">
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full h-10 px-3 py-2 border rounded-md ${
                        formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-slate-500`}
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className="text-red-500 text-xs">{formik.errors.description}</div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

export default AddSubscription;
