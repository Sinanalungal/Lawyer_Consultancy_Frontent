import React, { useEffect } from "react";
import Table from "../../../components/table/Table";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { getAxiosInstance } from "../../../services/axiosInstance/AxiosInstance";
// import AccessTokenManager from '../../../redux/slice/interceptor';
import Swal from "sweetalert2";
import Breadcrumb from "../../../components/breadcrump/BreadCrump";
import { debounce } from "lodash";
import AdminHome from "../home/AdminHome";

const buttonDetail = { key: "", label: "" };

const headers = [
  { key: "profile", label: "Profile" },
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Username/Email" },
  { key: "edit", label: "Edit" },
  { key: "status", label: "Block/Unblock" },
];

function UsersComponent() {
  // const { user } = useSelector((state: any) => state.login);

  const [users, setUsers] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>("");
  const [isVerified, setIsVerified] = React.useState<string | boolean>("all");
  const [previousPage, setPrevious] = React.useState<string | null>(null);
  const [nextPage, setNext] = React.useState<string | null>(null);
  const [pageNum, setPageNum] = React.useState<Number>(1);
  const [total_page, setTotal] = React.useState<Number>(1);

  useEffect(() => {
    async function fetchData(role: string) {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          `${BASE_URL}adminside/user-data/?role=${role}&search=${search}&isVerified=${isVerified}`
        );
        setUsers(response.data.results);
        setPrevious(response.data.previous);
        setNext(response.data.next);
        setTotal(response.data.count);
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const debouncedFetchData = debounce(fetchData, 1000);

    debouncedFetchData("user");

    return () => {
      debouncedFetchData.cancel();
    };
  }, [search, isVerified]);

  const callingNext = async () => {
    if (nextPage) {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          `${nextPage}?role=${"user"}&search=${search}&isVerified=${isVerified}`
        );
        setUsers(response.data.results);
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
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(
          `${previousPage}?role=${"user"}&search=${search}&isVerified=${isVerified}`
        );
        setUsers(response.data.results);
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

  const manageUser = async (id: number) => {
    try {
      const axiosInstance = await getAxiosInstance();
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
          { id: id, role: "user" }
        );
        if (result.isConfirmed) {
          if (response.status == 200) {
            Swal.fire({
              title: "Changed Successfully!",
              icon: "success",
            });
          }

          setUsers(response.data);
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  
  var data = users.map((user_data: any) => ({
    profile: user_data.profile?(<img className="w-12 h-12 rounded-md bg-cover" src={`${BASE_URL}${user_data.profile}`}/>):(<img className="w-12 h-12 rounded-md bg-cover" src='/profile-default.svg'/>),
    name: user_data.full_name,
    phone: user_data.phone_number,
    email: user_data.email,
    status: user_data.is_verified ? (
      <div
        className="px-2 py-1 text-xs bg-red-300 text-black cursor-pointer inline-block rounded-md"
        onClick={() => manageUser(user_data.id)}
      >
        Block
      </div>
    ) : (
      <div
        className="px-2 py-1 text-xs bg-green-300 text-black cursor-pointer inline-block rounded-md"
        onClick={() => manageUser(user_data.id)}
      >
        Unblock
      </div>
    ),
    edit: user_data.is_verified ? (
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
    { label: "User List" },
  ];

  return (
    <>
      <AdminHome
        ind={2}
        component={
          <div className="">
            <div className="p-6 font-semibold">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="w-full flex justify-center max-sm:text-2xl text-5xl font-bold h-auto">
              Users List
            </div>
            <p className="w-full flex justify-center  text-xs font-medium pb-9 h-auto mt-1">
              Users Data is listed in here
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
              itemsPerPage={15}
              buttonDetail={buttonDetail}
              search={search}
              setSearch={setSearch}
              nextButton={callingNext}
              previousButton={callingPrevious}
              pageNum={pageNum}
              total={Math.ceil(total_page/5)}
            />
          </div>
        }
      />
    </>
  );
}

export default UsersComponent;
