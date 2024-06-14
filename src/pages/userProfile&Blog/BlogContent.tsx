import React, { useState, useRef, useMemo, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import UserProfile from "./UserProfile";
import BlogCard from "./BlogCard";
import Modal from "../../components/modal/Modal";
import JoditEditor from "jodit-react";
import { IoCloseSharp } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./BlogContent.css";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import Loader from "../../components/loader/loader";


const BlogContent: React.FC = () => {
  const { value } = useSelector((state: any) => state.login);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<any>("");
  const [cropModal, setCropModal] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<any>(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [content, setContent] = useState("");
  const [secondModal, setSecondModal] = useState(false);
  const { user } = useSelector((state: any) => state.login);
  // const [newBlogAdded, setNewBlogAdded] = useState<boolean>(false);
  const [loader,setLoader] = useState(false)
  const [blogs, setBlogs] = useState<any[]>([]);
  const editor = useRef(null);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must be 100 characters or less")
      .matches(
        /^[^\s]+(\s[^\s]+)*$/,
        "Title should not have more than one consecutive space"
      )
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be 200 characters or less")
      .matches(
        /^[^\s]+(\s[^\s]+)*$/,
        "Description should not have more than one consecutive space"
      )
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const preprocessedValues: any = {};
      Object.keys(values).forEach((key) => {
        preprocessedValues[key] = values[key].replace(/\s+/g, " ").trim();
      });

      const blob = await dataURItoBlob(croppedImageUrl);
      const formData = new FormData();
      formData.append("title", preprocessedValues.title);
      formData.append("description", preprocessedValues.description);
      formData.append("content", content);
      formData.append("image", blob, "image.png");
      formData.append("user", value);

      if (content.length > 50 && croppedImageUrl.length > 0) {
        try {
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.post(
            BASE_URL + "blogsession/blogs/",
            formData,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 201) {
            toast.success("Blog added successfully");
            setSecondModal(false);
            setCroppedImageUrl("");
            setModal(false);
            setContent("");
            formik.resetForm();
            console.log(response.data, "this is the response data");
            // setNewBlogAdded(true);
            setBlogs([...blogs, response.data]);
          } else {
            toast.error("Check Your Content");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Add a proper content/image");
      }
    },
  });
  const dataURItoBlob = (dataURI: string) => {
    if (!dataURI) {
      return null;
    }

    // Extract base64 data and mime type from dataURI
    const [, base64Data] = dataURI.split(",");
    const mimeString = dataURI.split(":")[1].split(";")[0];

    // Convert base64 to raw binary data
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    // Create blob with appropriate mime type
    return new Blob(byteArrays, { type: mimeString });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = capitalizeWords(e.target.value);
    formik.handleChange(e);
    formik.setFieldValue("title", formattedValue);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const formattedValue = capitalizeWords(e.target.value);
    formik.handleChange(e);
    formik.setFieldValue("description", formattedValue);
  };

  const config = useMemo(() => {
    "Start typing...";
  });

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        setImage(reader.result);
        setCropModal(true);
        console.log(reader.result);
      };
    }
  };

  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (value: any) => {
    setAspectRatio(value);
  };

  const onCropDone = (croppedArea: any) => {
    if (!image || !croppedArea) {
      toast.error("Please crop the image first.");
      return;
    }

    const canvas = document.createElement("canvas");
    const imageObj = new Image();
    imageObj.src = image;

    imageObj.onload = () => {
      canvas.width = croppedArea.width;
      canvas.height = croppedArea.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        imageObj,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );
      const croppedDataURL = canvas.toDataURL("image/jpeg");

      setCroppedImageUrl(croppedDataURL);
      setCropModal(false);
    };
  };

  const onCropCancel = () => {
    setCropModal(false);
    setCroppedImageUrl("");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const axiosInstance = await getAxiosInstance(user);
        const response = await axiosInstance.get(
          BASE_URL + "blogsession/blogs/"
        );
        setBlogs(response.data);
        console.log(response.data);
        setLoader(false)
        // setNewBlogAdded(false);
      } catch (err) {
        console.log(err);
        setLoader(false)
      }
    };
    fetchData();
  }, []);

  return (
    <>
    {loader && <Loader width="w-full" height="min-h-screen" />}{" "}

    {!loader && (<div><>
        {/* <div className="w-full flex justify-center"><div className=" flex px-4  sm:w-[80%] space-x-1 items-center">
                <div className="px-3 py-1 text-xs border rounded-full bg-slate-50">Blogs</div>
                <div className="px-3 py-1 text-xs border rounded-full bg-slate-50">SavedBlogs</div>
              </div></div> */}
        <div className="w-full mx-auto p-4 flex  justify-end space-y-3 sm:text-sm font-semibold  sm:w-[80%]  rounded-lg">
          <div
            onClick={() => setModal(true)}
            className="sm:px-5 px-3 py-2 space-x-1 cursor-pointer bg-slate-800 flex justify-center items-center text-xs text-white rounded-full"
          >
            <p>Add Blog</p> <FaPlus size={10} />
          </div>
        </div>
        {/* <div className=" text-xs flex justify-start space-x-2 p-4 border-black sm:w-[80%] mx-auto">
          <p className="p-2 bg-slate-100 font-medium rounded-md" >all blogs</p>
          <p className="p-2 bg-slate-100  font-medium rounded-md">saved blogs</p>
        </div> */}
        <div className="w-full mx-auto p-4 grid md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 max-[450px]:grid-cols-1 gap-4 sm:text-sm font-semibold sm:w-[80%] items-start rounded-lg">
          {blogs.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              description={post.description}
              image={post.image}
              content={post.content}
              user={post.user.email}
              profile={post.user.profile}
              id={post.id}
              date={post.created_at}
              is_liked={post.is_liked}
              likes_count={post.likes_count}
              is_saved={post.is_saved}
              valid={post.valid}
              checked={post.checked}
            />
          ))}
        </div>
      </>
      {/* }
      /> */}

      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <div className="w-full bg-white  rounded-md">
          <div className="flex w-full p-6 items-center bg-slate-200 border justify-between font-semibold">
            <p className="font-semibold text-lg">Share Your Thoughts Here</p>
            <IoCloseSharp
              className="cursor-pointer"
              onClick={() => {
                setModal(false);
                // setTitle("");
                // setDescription("");
                setCroppedImageUrl("");
                // setImageSrc("");
                setContent("");
              }}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col p-6 max-[400px]:p-2">
              <div>
                <label
                  htmlFor="title"
                  className="flex p-2 justify-between font-medium"
                >
                  <p>Title</p>
                  <p className="text-[10px] font-light">
                    {formik.values.title.length}/100
                  </p>
                </label>
                <input
                  id="title"
                  name="title"
                  maxLength={100}
                  required
                  className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                  onChange={handleTitleChange}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="error text-red-600 text-[10px] px-2">
                    {formik.errors.title}
                  </div>
                ) : null}

                {/* <input
                id="title"
                name="title"
                maxLength={100}
                required
                className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                onChange={(e) => setTitle(capitalizeWords(e.target.value))}
                value={title}
              /> */}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="flex p-2 justify-between font-medium"
                >
                  <p>Description</p>
                  <p className="text-[10px] font-light">
                    {formik.values.description.length}/200
                  </p>
                </label>
                <textarea
                  id="description"
                  name="description"
                  maxLength={200}
                  required
                  className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                  onChange={handleDescriptionChange}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="error text-red-600 px-2 text-[10px]">
                    {formik.errors.description}
                  </div>
                ) : null}
                {/* <textarea
                id="description"
                name="description"
                maxLength={200}
                required
                className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                onChange={(e) =>
                  setDescription(capitalizeWords(e.target.value))
                }
                value={description}
              /> */}
              </div>
              <div>
                <label className="flex p-2 justify-between font-medium">
                  <p>Image</p>
                  {/* <p className="text-[10px] max-[400px]:hidden font-light">
                  Crop Image to 500x500 pixels
                </p> */}
                </label>
                {/* {error && (
                <div className="w-full h-[300px] flex  items-center justify-center">
                  {" "}
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )} */}
                {image && cropModal && (
                  <Modal
                    isOpen={cropModal}
                    onClose={() => {}}
                    children={
                      <div className="w-full cropper z-50 bg-white rounded-xl p-5 max-[400px]:p-2 space-y-3">
                        <p className="font-bold  text-2xl">Crop Image</p>
                        <div className="w-full  h-[400px] relative">
                          <Cropper
                            image={image}
                            aspect={aspectRatio}
                            crop={crop}
                            zoom={zoom}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            style={{
                              containerStyle: {
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#fff",
                              },
                            }}
                          />
                        </div>
                        <div className="action-btns mx-auto py-4">
                          <div className="aspect-ratios grid   grid-cols-4 max-[400px]:grid-cols-2   max-sm:gap-2 px-8 items-center">
                            <label
                              className="sm:mx-auto"
                              onClick={() => onAspectRatioChange(1 / 1)}
                            >
                              <button
                                type="button"
                                className={`${
                                  aspectRatio == 1 / 1
                                    ? "bg-black"
                                    : "border border-black"
                                } py-2 items-center rounded-xl px-3 flex justify-center space-x-1`}
                                name="ratio"
                              >
                                {" "}
                                <div
                                  className={`${
                                    aspectRatio == 1 / 1
                                      ? "border-white"
                                      : "border-black"
                                  } w-[10px] h-[10px] border-2 `}
                                ></div>
                                <p
                                  className={`${
                                    aspectRatio == 1 / 1
                                      ? "text-white"
                                      : "text-black"
                                  } text-[10px]`}
                                >
                                  1:1
                                </p>
                              </button>
                            </label>
                            {/* <label>
                      <input type="radio" checked={aspectRatio==5 / 4} value={5 / 4} name="ratio" /> 5:4
                    </label> */}
                            <label
                              className="sm:mx-auto"
                              onClick={() => onAspectRatioChange(4 / 3)}
                            >
                              <button
                                type="button"
                                className={`${
                                  aspectRatio == 4 / 3
                                    ? "bg-black"
                                    : "border border-black"
                                } py-2 items-center rounded-xl px-3 flex justify-center space-x-1`}
                                name="ratio"
                              >
                                {" "}
                                <div
                                  className={`${
                                    aspectRatio == 4 / 3
                                      ? "border-white"
                                      : "border-black"
                                  } w-[13px] h-[10px] border-2 `}
                                ></div>
                                <p
                                  className={`${
                                    aspectRatio == 4 / 3
                                      ? "text-white"
                                      : "text-black"
                                  } text-[10px]`}
                                >
                                  4:3
                                </p>
                              </button>
                            </label>
                            {/* <label>
                      <input type="radio" checked={aspectRatio==3 / 2} value={3 / 2} name="ratio" /> 3:2
                    </label> */}
                            <label
                              className="sm:mx-auto"
                              onClick={() => onAspectRatioChange(5 / 3)}
                            >
                              <button
                                type="button"
                                className={`${
                                  aspectRatio == 5 / 3
                                    ? "bg-black"
                                    : "border border-black"
                                } py-2 items-center rounded-xl px-3 flex justify-center space-x-1`}
                                name="ratio"
                              >
                                {" "}
                                <div
                                  className={`${
                                    aspectRatio == 5 / 3
                                      ? "border-white"
                                      : "border-black"
                                  } w-[14px] h-[10px] border-2 `}
                                ></div>
                                <p
                                  className={`${
                                    aspectRatio == 5 / 3
                                      ? "text-white"
                                      : "text-black"
                                  } text-[10px]`}
                                >
                                  5:3
                                </p>
                              </button>
                            </label>
                            <label
                              className="sm:mx-auto"
                              onClick={() => onAspectRatioChange(16 / 9)}
                            >
                              <button
                                type="button"
                                className={`${
                                  aspectRatio == 16 / 9
                                    ? "bg-black"
                                    : "border border-black"
                                } py-2 items-center rounded-xl px-3 flex justify-center space-x-1`}
                                name="ratio"
                              >
                                {" "}
                                <div
                                  className={`${
                                    aspectRatio == 16 / 9
                                      ? "border-white"
                                      : "border-black"
                                  } w-[16px] h-[10px] border-2 `}
                                ></div>
                                <p
                                  className={`${
                                    aspectRatio == 16 / 9
                                      ? "text-white"
                                      : "text-black"
                                  } text-[10px]`}
                                >
                                  16:9
                                </p>
                              </button>
                            </label>
                            {/* <label>
                      <input type="radio" checked={aspectRatio==3 / 1} value={3 / 1} name="ratio" /> 3:1
                    </label> */}
                          </div>
                        </div>

                        <div className="w-full space-x-2 flex justify-end">
                          <div
                            onClick={onCropCancel}
                            className=" px-3 py-2 font-semibold flex justify-center text-sm  items-center text-black border border-black rounded-full cursor-pointer"
                          >
                            Cancel
                          </div>
                          <div
                            onClick={() => {
                              onCropDone(croppedArea);
                            }}
                            className="px-5 font-semibold text-sm  py-2 flex justify-center bg-black text-white rounded-full cursor-pointer"
                          >
                            Save
                          </div>
                        </div>
                      </div>
                    }
                  ></Modal>
                )}

                {croppedImageUrl ? (
                  <img
                    className="object-contain border border-opacity-20 rounded-md  w-full h-[300px]"
                    src={croppedImageUrl}
                    alt="cropped image of blog"
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 max-[400px]:text-[10px] text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold ">
                              Click to upload
                            </span>{" "}
                          </p>
                          {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p> */}
                        </div>

                        <input
                          id="dropzone-file"
                          type="file"
                          onChange={handleOnChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </>
                  // <input type="file" onChange={handleImageSelect} accept="image/*" />
                )}
                <div>
                  <label className="flex p-2 justify-between font-medium">
                    <p>Content</p>
                    {/* <p className="text-[10px] font-light">{description.length}/200</p> */}
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {
                      setContent(newContent);
                    }}
                  />
                  {/* <textarea
                  id="content"
                  name="content"
                  required
                  onFocus={() => setSecondModal(true)}
                  className="w-full mt-2 px-3 py-2 mb-1 text-gray-500 bg-transparent outline-none border focus:border-gray-300 shadow-sm rounded-lg"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                /> */}
                  <Modal
                    isOpen={secondModal}
                    onClose={() => {
                      setSecondModal(false);
                    }}
                    children={
                      <>
                        <div className="w-full bg-white rounded-lg shadow-lg">
                          <div className="flex w-full p-2 items-center bg-slate-200 border justify-between font-semibold">
                            <p className="font-semibold">Type Content Here</p>
                            <IoCloseSharp
                              className="cursor-pointer"
                              onClick={() => {
                                setSecondModal(false);
                              }}
                            />
                          </div>
                          <textarea
                            id="content"
                            name="content"
                            required
                            className="w-full  px-3 py-2 min-h-[600px] mb-1 text-gray-500 bg-transparent outline-none  focus:border-gray-300 shadow-sm rounded-lg"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                          />
                        </div>
                      </>
                    }
                  />
                  <div className="w-full py-3 mt-3 flex justify-center">
                    <button
                      type="submit"
                      className="w-full justify-center flex py-2  cursor-pointer bg-slate-900 rounded-full text-white font-semibold"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal></div>)}
    </>
  );
};

export default BlogContent;
