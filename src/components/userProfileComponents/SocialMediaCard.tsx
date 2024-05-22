import { useState } from "react";
import { MdIosShare, MdModeEdit } from "react-icons/md";
import Cropper from "react-easy-crop";
import Modal from "../modal/Modal";
import { useSelector } from "react-redux";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";

const SocialMediaCard: React.FC = ({ userDetails, setUserDetails }) => {
  // const [image, setImage] = useState<any>("/login.jpg");
  const [uploadModal, setUploadModal] = useState(false);
  const [ImageCrop, setImageCrop] = useState("");
  const [cropStart, setCropStart] = useState(false);
  const [cropingValue, setCropingValue] = useState({ x: 0, y: 0 });
  const [zoomingValue, setZoomingValue] = useState(1);
  const [croppedRegion, setCroppedRegion] = useState(null);
  // const [resultantCrop, setResultantCrop] = useState("");
  const { value, user } = useSelector((state: any) => state.login);

  const handleChangeManage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setImageCrop(reader.result);
        setCropStart(true);
        console.log(reader.result);
        setUploadModal(false);
      };
    }
  };

  const profileUpdate = async (resultUrl) => {
    try {
      const axiosInstance = await getAxiosInstance();
      const blob = await dataURItoBlob(resultUrl);
      const formData = new FormData();
      formData.append("profile", blob, "image.png");
      console.log(blob);
      const response = await axiosInstance.patch(
        BASE_URL + `api/users/${value}/update/`,
        formData
      );
      setCropStart(false);
      setImageCrop("");
      setCroppedRegion(null);
      setUserDetails(response.data);
      console.log(response.data);
      // setUserDetails(response.data);
      toast.success('image added successfully')
      // setEditModal(false)
      return response;
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.message);
    }
  };
  const CropCompleted = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedRegion(croppedAreaPixels);
  };
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

  const cropCancel = () => {
    setCropStart(false);
    setCroppedRegion(null);
    setImageCrop("");
  };
  const CropDone = (value) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = value.width;
    canvasEle.height = value.height;
    const ctx = canvasEle.getContext("2d");

    let imgObject = new Image();
    imgObject.src = ImageCrop;
    imgObject.onload = () => {
      ctx.drawImage(
        imgObject,
        value.x,
        value.y,
        value.width,
        value.height,
        0,
        0,
        value.width,
        value.height
      );
      const resultUrl = canvasEle.toDataURL("image/jpeg");

      // setResultantCrop();
      if (resultUrl != "") {
        const response = profileUpdate(resultUrl);
      } else {
        toast.error("give a valid image");
      }
    };
  };

  return (
    <>
      <div className="w-full p-4 md:px-12  md:py-4 lg:py-16 flex max-md:flex-col sm:w-[80%] items-start bg-gray-100 rounded-3xl">
        <div className="my-auto">
          <div className="max-sm:w-[100px] my-auto max-sm:h-[100px] w-[150px] h-[150px] relative bg-black rounded-full overflow-hidden">
            <img
              className="object-cover h-full w-full"
              src={userDetails.profile}
              alt=""
            />
          </div>
          <div
            onClick={() => setUploadModal(true)}
            className="cursor-pointer sm:w-[30px] w-[23px] h-[23px] sm:h-[30px] ml-20 -mt-10  rounded-full sm:ml-28 sm:-mt-10   bg-slate-800 flex  justify-center items-center absolute"
          >
            <MdModeEdit color="white" />
          </div>
        </div>
        <div className="flex-grow w-full sm:w-[80%] p-4 ">
          <div className="flex space-y-4 justify-between space-x-1 flex-wrap w-full max-sm:mx-auto items-end mb-2">
            <p className="text-3xl truncate max-sm:text-xl font-bold">
              {userDetails.full_name}
            </p>
            <div className="max-md:hidden  flex  space-x-1">
              <div className="px-5 py-2  bg-slate-800 flex justify-center items-center text-xs text-white rounded-full">
                follow
              </div>
              <div className="px-3 py-2 border border-slate-800 flex justify-center items-center text-xs text-black rounded-full">
                <MdIosShare size={15} />
              </div>
            </div>
          </div>
          <div className="w-full py-5 flex space-x-7 max-[400px]:text-xs sm:ml-4">
            <div className="max-w-[100px]  h-full justify-center items-start flex flex-col text-center">
              <p className="font-bold">Blogs</p>
              <p className="text-lg max-[400px]:text-sm font-bold">100</p>
            </div>
            <div className="max-w-[100px] h-full justify-center items-start flex flex-col text-center">
              <p className="font-bold">Followers</p>
              <p className="text-lg max-[400px]:text-sm font-bold">10</p>
            </div>
          </div>
          {/* <p className="text-xs md:text-sm">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure
          </p> */}
        </div>
        <div className="md:hidden p-2 flex space-x-1">
          <div className="px-5 py-2 bg-slate-800 flex justify-center items-center text-xs text-white rounded-full">
            follow
          </div>
          <div className="px-3 py-2 border border-slate-800 flex justify-center items-center text-xs text-black rounded-full">
            <MdIosShare size={15} />
          </div>
        </div>
      </div>
      {uploadModal && !cropStart && (
        <Modal
          isOpen={uploadModal}
          onClose={() => {setUploadModal(false)}}
          children={
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
                    <span className="font-semibold ">Click to upload</span>{" "}
                  </p>
                </div>

                <input
                  id="dropzone-file"
                  type="file"
                  onChange={handleChangeManage}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
          }
        />
      )}
      {cropStart && (
        <Modal
          isOpen={cropStart}
          onClose={() => {}}
          children={
            <div className="flex flex-col bg-white p-4 items-center justify-center w-full">
              <div className="w-full  h-[400px] relative">
                <Cropper
                  image={ImageCrop}
                  aspect={1 / 1}
                  crop={cropingValue}
                  zoom={zoomingValue}
                  onCropChange={setCropingValue}
                  onZoomChange={setZoomingValue}
                  onCropComplete={CropCompleted}
                  style={{
                    containerStyle: {
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </div>
              <div className="w-full space-x-2 flex justify-end mt-4">
                <div
                  onClick={cropCancel}
                  className="px-3 py-2 font-semibold flex justify-center text-sm items-center text-black border border-black rounded-full cursor-pointer"
                >
                  Cancel
                </div>
                <div
                  onClick={() => {
                    CropDone(croppedRegion);
                  }}
                  className="px-5 font-semibold text-sm py-2 flex justify-center bg-black text-white rounded-full cursor-pointer"
                >
                  Save
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default SocialMediaCard;
