import React, { useEffect } from "react";
import Table from "../../../components/table/Table";
import { BASE_URL } from "../../../constants";
import { getAxiosInstance } from "../../../services/axiosInstance/AxiosInstance";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Breadcrumb from "../../../components/breadcrump/BreadCrump";
import { debounce } from "lodash";
import AdminHome from "../home/AdminHome";


const buttonDetail = { key: "Add Lawyers", label: "../add-lawyer" };

const headers = [
  { key: "image", label: "Image" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Username/Email" },
  { key: "department", label: "Department" },
  { key: "certificates", label: "Certificates" },
  { key: "edit", label: "Edit" },
  { key: "status", label: "Block/Unblock" },
];

function LawyersComponent() {
  const { user } = useSelector((state: any) => state.login);
  const [lawyers, setLawyers] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>("");
  const [isVerified, setIsVerified] = React.useState<string | boolean>("all");
  const [previousPage, setPrevious] = React.useState<string | null>(null);
  const [nextPage, setNext] = React.useState<string | null>(null);
  const [pageNum, setPageNum] = React.useState<Number>(1);
  const [total_page, setTotal] = React.useState<Number>(1);


  useEffect(() => {
    async function fetchData(role: string) {
      try {
        const axiosInstance = await getAxiosInstance(user);
        const response = await axiosInstance.get(
          `${BASE_URL}adminside/user-data/?role=${role}&search=${search}&isVerified=${isVerified}`
        );
        setLawyers(response.data.results);
        setPrevious(response.data.previous);
        setNext(response.data.next);
        setTotal(response.data.count);
      } catch (error) {
        console.log(error);
      }
    }
    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData("lawyer");

    return () => {
      debouncedFetchData.cancel();
    };
  }, [search, isVerified]);


  const callingNext = async () => {
    if (nextPage) {
      try {
        const axiosInstance = await getAxiosInstance(user);
        const response = await axiosInstance.get(
          `${nextPage}?role=${"lawyer"}&search=${search}&isVerified=${isVerified}`
        );
        setLawyers(response.data.results);
        setPrevious(response.data.previous);
        setNext(response.data.next);
        setTotal(response.data.count);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setPageNum((pageNum) => pageNum + 1);
    }
  };
  const callingPrevious = async () => {
    if (previousPage) {
      try {
        const axiosInstance = await getAxiosInstance(user);
        const response = await axiosInstance.get(
          `${previousPage}?role=${"lawyer"}&search=${search}&isVerified=${isVerified}`
        );
        setLawyers(response.data.results);
        setPrevious(response.data.previous);
        setNext(response.data.next);
        setTotal(response.data.count);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setPageNum((pageNum) => pageNum - 1);
    }
  };


  const manageLawyer = async (id: number) => {
    try {
      const axiosInstance = await getAxiosInstance(user);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change it!",
      }).then(async (result) => {
        const response = await axiosInstance.patch(
          `${BASE_URL}adminside/user-data/`,
          { id: id, role: "lawyer" }
        );
        if (result.isConfirmed) {
          if (response.status == 200) {
            Swal.fire({
              title: "Changed Successfully!",
              icon: "success",
            });
          }
          setLawyers(response.data);
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  var data = lawyers.map((lawyer_data: any) => ({
    name: lawyer_data.full_name,
    phone: lawyer_data.phone_number,
    email: lawyer_data.email,
    department: "Family",
    certificates: "Bachelor of Law",
    status: lawyer_data.is_verified ? (
      <div
        className="px-2 py-1 text-xs bg-red-300 text-black cursor-pointer inline-block rounded-md"
        onClick={() => manageLawyer(lawyer_data.id)}
      >
        Block
      </div>
    ) : (
      <div
        className="px-2 py-1 text-xs bg-green-300 text-black cursor-pointer inline-block rounded-md"
        onClick={() => manageLawyer(lawyer_data.id)}
      >
        Unblock
      </div>
    ),
    edit: lawyer_data.is_verified ? (
      <div className="px-2 py-1 text-xs font-bold text-black cursor-pointer inline-block rounded-md">
        Active
      </div>
    ) : (
      <div className="px-2 py-1 text-xs font-bold text-black cursor-pointer inline-block rounded-md">
        InActive
      </div>
    ),
  }));
  const breadcrumbItems = [
    { label: "Admin", link: "/admin" },
    { label: "Lawyers List" },
  ];

  return (
    <>
      <AdminHome ind={1} component={<div className="">
        <div className="p-6 font-semibold">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="w-full flex justify-center max-sm:text-2xl text-5xl font-bold h-auto">
          Lawyers List
        </div>
        <p className="w-full flex justify-center  text-xs font-medium pb-9 h-auto mt-1">
          Lawyers Data is listed in here
        </p>
        <div className="px-7 max-sm:px-2 py-1">
          <div className="text-xs flex items-center font-bold rounded-md space-x-1">
            <div
              className={`${
                isVerified == "all" && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer`}
              onClick={() => setIsVerified("all")}
            >
              all
            </div>
            <div
              className={`${
                isVerified == false && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer `}
              onClick={() => setIsVerified(false)}
            >
              blocked
            </div>
            <div
              className={`${
                isVerified == true && "shadow bg-slate-200 "
              } px-2 py-1 rounded-md border border-opacity-30 sm:px-3 sm:py-2 cursor-pointer`}
              onClick={() => setIsVerified(true)}
            >
              unblocked
            </div>
          </div>
        </div>

      <Table
        columns={headers}
        data={data}
        // itemsPerPage={15}
        buttonDetail={buttonDetail}
        search={search}
        setSearch={setSearch}
        nextButton={callingNext}
        previousButton={callingPrevious}
        pageNum={pageNum}
        total={Math.ceil(total_page/5)}
      />
      </div>}/>
    </>
  );
}

export default LawyersComponent;
