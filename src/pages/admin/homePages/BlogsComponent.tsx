import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAxiosInstance } from '../../../services/axiosInstance/AxiosInstance';
import { BASE_URL } from '../../../constants';
import Table from '../../../components/table/Table';
import AdminHome from '../home/AdminHome';
import Breadcrumb from '../../../components/breadcrump/BreadCrump';
import { useNavigate } from 'react-router-dom';

const buttonDetail = { key: '', label: '' };

const headers = [
  { key: 'image', label: 'Image' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'time', label: 'Time' },
  { key: 'writer', label: 'Writer' },
  { key: 'Read', label: 'Read' },
  { key: 'verify', label: 'Verify' },
];

function BlogsComponent() {
  const { user } = useSelector((state: any) => state.login);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [previousPage, setPrevious] = useState<string | null>(null);
  const [nextPage, setNext] = useState<string | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = async (page = 1) => {
    try {
      const axiosInstance = await getAxiosInstance(user);
      const response = await axiosInstance.get(
        `${BASE_URL}adminside/blogs/?search=${search}&ordering=-created_at&page=${page}&page_size=5`
      );
      setBlogs(response.data.results);
      setPrevious(response.data.previous);
      setNext(response.data.next);
      setTotalPages(Math.ceil(response.data.count / 5));
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchData(pageNum);
  }, [search, pageNum]);

  const handleReadClick = (blog:any) => {
    navigate("../blogpage", {
      state: {
        title: blog.title,
        description: blog.description,
        image: blog.image,
        mainContent: blog.content,
        bloguser: blog.user,
        blogId: blog.id,
        blogDate: blog.formattedDate,
        is_liked: blog.is_liked,
        likes_count: blog.likes_count,
        is_saved: blog.is_saved
      },
    });
  };
  const data = blogs.map((blog) => ({
    image: <img className="w-12 h-12 rounded-md bg-cover" src={blog.image} alt={blog.title} />,
    title: blog.title,
    description: blog.description,
    time: (
      <div>
        <p>
          {new Date(blog.created_at).toLocaleDateString('en-US', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
          })}
        </p>
        &nbsp;
        <time dateTime={new Date(blog.created_at).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}>
          {new Date(blog.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </time>
      </div>
    ),
    writer: blog.user, // Assuming the `user` field on the blog is a user object
    Read: <div className="px-2 py-1 text-xs bg-slate-900 text-white inline-block rounded-md" onClick={() => handleReadClick(blog)}>Read</div>,
    verify: <div className="px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md">Reject</div>,
  }));

  const breadcrumbItems = [
    { label: 'Admin', link: '/admin' },
    { label: 'Blogs' },
  ];

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
        ind={4}
        component={
          <div className="w-full h-full">
            <div className="p-6 font-semibold">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto">Blogs</div>
            <Table
              columns={headers}
              data={data}
              buttonDetail={buttonDetail}
              search={search}
              setSearch={setSearch}
              nextButton={handleNextPage}
              previousButton={handlePreviousPage}
              pageNum={pageNum}
              total={totalPages}
            />
          </div>
        }
      />
    </>
  );
}

export default BlogsComponent;
