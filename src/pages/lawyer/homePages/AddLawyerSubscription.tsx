import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../../../components/breadcrump/BreadCrump";
import { getAxiosInstance } from "../../../services/axiosInstance/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import Select from "react-select";
import LawyerHome from "../home/LawyerHome";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddLawyerSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const {value}= useSelector((store:any) => store.login)
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Lawyer", link: "../../" },
    { label: "Subscriptions", link: "../subscriptions" },
    { label: "Add Subscription" },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          `${BASE_URL}subscriptions/all_subscription_plan_models/`
        );
        setSubscriptions(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlans();
  }, []);

  const available_plans = subscriptions.map((subscription) => ({
    value: subscription.id,
    label: (
      <div>
        <p className="text-black">{subscription.name}</p>
        <p className="text-gray-500">{`(billing: ${subscription.billing_cycle} ${subscription.billing_period}, Min. Price: ${subscription.min_price}, Max. Price: ${subscription.max_price})`}</p>
      </div>
    ),
    min_price: subscription.min_price,
    max_price: subscription.max_price,
  }));

  const formik = useFormik({
    initialValues: {
      availablePlans: null,
      price: "",
    },
    validationSchema: Yup.object().shape({
      availablePlans: Yup.object()
        .nullable()
        .required("Please select a subscription plan."),
      price: Yup.number()
        .required("Please enter a price.")
        .test(
          "price-range",
          "Price must be within the selected plan's range.",
          function (value) {
            if (!selectedPlan) return false;
            return (
              value >= selectedPlan.min_price && value <= selectedPlan.max_price
            );
          }
        ),
    }),
    onSubmit: async(values) => {
    //   console.log(values);
    //   console.log(values.price)
    //   console.log(values.availablePlans.value);    
      const data = {
        subscription_plan_id: values.availablePlans.value,
        price: values.price,
        lawyer_id:value,
      }
      console.log(data);
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post(`${BASE_URL}subscriptions/lawyer_subscription_plans/`, data);
        console.log(response);
        toast.success('Subscription Plan Added Successfully')
        navigate('../subscriptions');
      } catch (error) {
        toast.error(error.response.data.error)
        console.error('Error creating subscription plan:', error);
      }
      
    },
  });

  const handlePlanChange = (selectedOption) => {
    setSelectedPlan(selectedOption);
    formik.setFieldValue("availablePlans", selectedOption);
  };

  return (
    <>
      <LawyerHome
        ind={2}
        component={
          <div className="w-full p-6 flex flex-col min-h-screen">
            <div className="font-semibold py-2">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full space-y-2 font-semibold p-4"
            >
              <div className="max-[400px]:flex w-full justify-end hidden text-xs space-x-1">
                <button
                  type="button"
                  onClick={() => navigate("../")}
                  className="bg-white border p-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-700 border px-2 p-1 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="w-full mt-10 border bg-slate-50 rounded-md border-t p-3 flex justify-between">
                <div>
                  <p className="text-xl font-semibold">Add Subscriptions</p>
                  <p className="text-[11px] mt-1 font-normal text-gray-700">
                    Add Subscription In Here
                  </p>
                </div>
                <div className="flex max-[400px]:hidden text-xs p-2 space-x-1">
                  <button
                    type="button"
                    onClick={() => navigate("../")}
                    className="bg-white border p-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-slate-700 border px-2 p-1 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Available Plans</p>
                  <div className="flex w-full flex-col">
                    <Select
                      id="availablePlans"
                      name="availablePlans"
                      options={available_plans}
                      value={formik.values.availablePlans}
                      onChange={handlePlanChange}
                      className="block w-full rounded-md text-xs mt-1"
                    />
                    {formik.errors.availablePlans &&
                    formik.touched.availablePlans ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.availablePlans}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex flex-col pt-1 justify-center space-y-1">
                <div className="flex max-md:flex-col space-y-1">
                  <p className="text-xs my-auto md:w-[20%]">Price</p>
                  <div className="flex w-full flex-col">
                    <input
                      type="number"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full h-10 px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 ${
                        formik.errors.price && formik.touched.price
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.errors.price && formik.touched.price ? (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.price}
                      </div>
                    ) : null}
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

export default AddLawyerSubscription;
