import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../../components/breadcrump/BreadCrump";
import FileUpload from "../../../components/imageUpload/FileUpload";
import FileUploadComponent from "../../../components/imageUpload/FileUploadComponentSmall";
import AdminHome from "../home/AdminHome";
import Modal from "../../../components/modal/Modal";
import Cropper from "react-easy-crop";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddLawyer() {
  const [uploadModal, setUploadModal] = useState(false);
  const [ImageCrop, setImageCrop] = useState("");
  const [cropStart, setCropStart] = useState(false);
  const [cropingValue, setCropingValue] = useState({ x: 0, y: 0 });
  const [zoomingValue, setZoomingValue] = useState(1);
  const [croppedRegion, setCroppedRegion] = useState(null);
  const [resultantCrop, setResultantCrop] = useState("");
  const [resultantCropDocument, setResultantCropDocument] = useState("");
  const [cropType, setCropType] = useState("");
  const { user } = useSelector((state: any) => state.login);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      department: "",
      experience: "",
      description: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      department: Yup.string().required("Department is required"),
      experience: Yup.number().required("Experience is required").min(0, "Experience must be at least 0"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

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
    setCropType("profile");
  };

  const handleChangeManageDoc = (e) => {
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
    setCropType("doc");
  };

  const CropCompleted = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedRegion(croppedAreaPixels);
  };

  const dataURItoBlob = (dataURI: string) => {
    if (!dataURI) {
      return null;
    }

    const [, base64Data] = dataURI.split(",");
    const mimeString = dataURI.split(":")[1].split(";")[0];

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

    return new Blob(byteArrays, { type: mimeString });
  };

  const cropCancel = () => {
    setCropStart(false);
    setCroppedRegion(null);
    setImageCrop("");
  };

  const CropDone = (value: any) => {
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

      if (cropType === "profile") {
        setResultantCrop(resultUrl);
      } else {
        setResultantCropDocument(resultUrl);
      }
      setCropStart(false);
      setImageCrop("");
      setCroppedRegion(null);
    };
  };

  const breadcrumbItems = [
    { label: "Admin", link: "../../" },
    { label: "Lawyer List", link: "../" },
    { label: "Add Lawyer" },
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
              <button className="bg-white border p-2 rounded-md">Cancel</button>
              <button type="submit" className="bg-slate-700 border px-2 p-1 text-white rounded-md">Add</button>
            </div>
            <div className="w-full  mt-10 border bg-slate-50 rounded-md border-t p-3 flex justify-between">
              <div>
                <p className="text-xl font-semibold">Add Lawyers</p>
                <p className="text-[11px] mt-1 font-normal text-gray-700">Add Lawyers In Here</p>
              </div>
              <div className="flex max-[400px]:hidden text-xs p-2 space-x-1">
                <button className="bg-white border p-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-slate-700 border px-2 p-1 text-white rounded-md">Add</button>
              </div>
            </div>
              <div className="flex flex-col pt-5 justify-center   space-y-1 ">
                <div className="flex "><p className="text-xs md:w-[20%]">Full Name</p>
                <input
                  type="text"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("fullName")}
                /></div>
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-600 w-full justify-end flex text-xs">{formik.errors.fullName}</div>
                ) : null}
              </div>
              <div className="flex flex-col pt-1 justify-center   space-y-1 ">
                <div className="flex">
                <p className="text-xs md:w-[20%]">Email Address</p>
                <input
                  type="email"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("email")}
                />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 w-full justify-end flex text-xs">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col pt-1 justify-center   space-y-1">
                <div className="flex">
                <p className="text-xs md:w-[20%]">Phone Number</p>
                <input
                  type="text"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("phoneNumber")}
                />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-600 w-full flex justify-end text-xs">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="flex max-md:flex-col justify-center space-y-1 md:items-center">
                <p className="text-xs md:w-[20%]">Profile Pic</p>
                <div className="w-full flex space-y-2 max-[400px]:flex-col justify-between items-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500">
                  {resultantCrop ? (
                    <div className="sm:h-[150px] h-[80px] w-[80px] relative sm:w-[150px] rounded-full mx-auto">
                      <img src={resultantCrop} className="w-full object-cover rounded-full" alt="Profile Pic" />
                      <div className="absolute h-4 w-4 bg-green-800 right-0 -mt-7 sm:-mt-12 rounded-md"></div>
                    </div>
                  ) : (
                    <FileUpload handleChangeManage={handleChangeManage} />
                  )}
                </div>
              </div>
              <div className="flex flex-col pt-1 justify-center   space-y-1">
                <div className="flex">
                <p className="text-xs md:w-[20%]">Department</p>
                <input
                  type="text"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("department")}
                />
                </div>
                {formik.touched.department && formik.errors.department ? (
                  <div className="text-red-600 w-full flex justify-end text-xs">{formik.errors.department}</div>
                ) : null}
              </div>
              <div className="flex max-md:flex-col justify-between space-y-1 md:items-center">
                <p className="text-xs md:w-[20%]">Document</p>
                {resultantCropDocument ? (
                  <div className="w-full h-full mx-auto relative">
                    <img
                      src={resultantCropDocument}
                      className="w-full object-cover h-[300px] rounded-md"
                      alt="Crop Result"
                    />
                    <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-75 text-white text-xs px-2 py-1 rounded-br-md">
                      Uploaded file
                    </div>
                  </div>
                ) : (
                  <FileUploadComponent handleChangeManage={handleChangeManageDoc} />
                )}
              </div>
              <div className="flex flex-col pt-1 justify-center   space-y-1">
                <div className="flex">
                <p className="text-xs md:w-[20%]">Experience</p>
                <input
                  type="number"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("experience")}
                />
                </div>
                {formik.touched.experience && formik.errors.experience ? (
                  <div className="text-red-600 w-full flex justify-end text-xs">{formik.errors.experience}</div>
                ) : null}
              </div>
              <div className="flex flex-col pt-1 justify-center   space-y-1">
                <div className="flex">
                <p className="text-xs md:w-[20%]">Description</p>
                <textarea
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  {...formik.getFieldProps("description")}
                />
                </div>
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-600 w-full flex justify-end text-xs">{formik.errors.description}</div>
                ) : null}
              </div>
              {/* <div className="flex justify-end space-x-2 mt-4">
                <button type="button" className="bg-white border p-2 rounded-md">
                  Cancel
                </button>
                <button type="submit" className="bg-slate-700 border px-2 p-1 text-white rounded-md">
                  Add
                </button>
              </div> */}
            </form>
          </div>
        }
      />
      {cropStart && (
        <Modal
          isOpen={cropStart}
          onClose={() => {}}
          children={
            <div className="flex flex-col bg-white p-4 items-center justify-center w-full">
              <div className="w-full h-[400px] relative">
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
}

export default AddLawyer;
