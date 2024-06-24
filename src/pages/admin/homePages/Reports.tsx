import { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import AdminHome from "../home/AdminHome";
import { getAxiosInstance } from "../../../services/axiosInstance/AxiosInstance";
import { BASE_URL, ImgBackendUrl } from "../../../constants";
import { useNavigate } from "react-router-dom";

const buttonDetail = { key: "", label: "" };

const headers = [
  { key: "image", label: "Image" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "time", label: "Time" },
  { key: "Read", label: "Read" },
  { key: "Reports", label: "Reports" },
  { key: "verify", label: "Verify" },
];

function AdminReports() {
  const [report, setReports] = useState([]);
  const [search, setSearch] = useState();
  const [previousPage, setPrevious] = useState<string | null>(null);
  const [nextPage, setNext] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  async function fetchData() {
    const axiosInstance = await getAxiosInstance();
    await axiosInstance
      .get(BASE_URL + "blogsession/report-blog/")
      .then((response) => {
        setReports(response.data.results);
        console.log(response);
        setPrevious(response.data.previous);
        setNext(response.data.next);
        setTotalPages(Math.ceil(response.data.count / 5));
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleReadClick = (report: any) => {
    console.log(report.image);

    navigate("../blogpage", {
      state: {
        title: report.title,
        description: report.description,
        image: report.image,
        mainContent: report.content,
        bloguser: report.user.full_name,
        profile: report.user.profile,
        blogId: report.id,
        blogDate: report.created_at,
        is_liked: report.is_liked,
        likes_count: report.likes_count,
        is_saved: report.is_saved,
      },
    });
  };
  const RepotsViewController=(report)=>{
    navigate('../reports-view/',{state:{
      report:report.reports
    }})
  }
  const verifyFunction = async (blog_id: Number) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const response = await axiosInstance.post(
        `${BASE_URL}blogsession/validate-blog/`,
        {
          blog: blog_id,
        }
      );
      const updatedBlog = response.data;
      console.log(updatedBlog, "the  response data");

      setReports(() =>
        report.map((reports) =>
          reports.id === updatedBlog.id ? updatedBlog : reports
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const data = report.map((report) => ({
    image: (
      <img
        className="w-12 h-12 rounded-md bg-cover"
        src={report.image}
        alt={report.title}
      />
    ),
    title: report.title,
    description: report.description,
    time: (
      <div>
        <p>
          {new Date(report.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            year: "numeric",
            month: "long",
          })}
        </p>
        &nbsp;
        <time
          dateTime={new Date(report.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        >
          {new Date(report.created_at).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </time>
      </div>
    ),
    Read: (
      <div
        className="px-2 py-1 text-xs bg-slate-900 text-white inline-block rounded-md"
        onClick={() => handleReadClick(report)}
      >
        Read
      </div>
    ),
    Reports: (
      <div className="flex items-center justify-center flex-col">
      
      <div
        className="px-2 py-1 text-xs bg-slate-900 text-white inline-block rounded-md"
        onClick={() => {RepotsViewController(report)}}
      >View Reports ({report.reports.length})</div>
      </div>),
    verify: report.valid ? (
      <div
        onClick={() => verifyFunction(report.id)}
        className="px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md"
      >
        Reject
      </div>
    ) : (
      <div
        onClick={() => verifyFunction(report.id)}
        className="px-2 py-1 text-xs bg-green-300 text-black inline-block rounded-md"
      >
        Accept
      </div>
    ),
  }));
  const handleNextPage = () => {
    if (nextPage) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };
  return (
    <>
      <AdminHome
        ind={5}
        component={
          <div>
            <div className="w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto">
              Notifications
            </div>
            <Table
              columns={headers}
              data={data}
              search={search}
              setSearch={setSearch}
              nextButton={handleNextPage}
              previousButton={handlePreviousPage}
              itemsPerPage={15}
              pageNum={pageNum}
              total={totalPages}
              buttonDetail={buttonDetail}
            />
          </div>
        }
      />
    </>
  );
}

export default AdminReports;
