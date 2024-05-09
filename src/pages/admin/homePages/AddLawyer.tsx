import Breadcrumb from "../../../components/breadcrump/BreadCrump";
import FileUpload from "../../../components/imageUpload/FileUpload";
import FileUploadComponent from "../../../components/imageUpload/FileUploadComponentSmall";
import AdminHome from "../home/AdminHome"

function AddLawyer() {
    const breadcrumbItems = [
        { label: "Admin", link: "../../" },
        { label: "Lawyer List" ,link:'../' },
        { label: "Add Lawyer"  },
      ];
  return (
    <>
        <AdminHome ind={1} component={<div className='w-full p-6 flex flex-col min-h-screen'>
            <div className=" font-semibold py-2">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className=" max-[400px]:flex w-full justify-end hidden text-xs   space-x-1">
                    <button className="bg-white border p-2  rounded-md">Cancel</button>
                    <button className="bg-slate-700 border px-2 p-1 text-white rounded-md">Add</button>
                </div>
            {/* <hr className="inline-block mt-6"/> */}
            <div className='w-full  mt-10 border bg-slate-50 rounded-md border-t p-3  flex justify-between'>
                <div className=''><p className="text-xl font-semibold">Add Lawyers</p>
                    <p className="text-[11px] mt-1 font-normal text-gray-700">Add Lawyers In  Here</p>
                </div>
                <div className="flex max-[400px]:hidden text-xs p-2  space-x-1">
                    <button className="bg-white border p-2  rounded-md">Cancel</button>
                    <button className="bg-slate-700 border px-2 p-1 text-white rounded-md">Add</button>
                </div>
            </div>
            <div className=" w-full space-y-2 font-semibold p-4">
                <div className="flex max-md:flex-col justify-center space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Full Name</p>
                    <input type="text" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
                <div className="flex max-md:flex-col justify-center space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Email Address</p>
                    <input type="text" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
                <div className="flex max-md:flex-col justify-center space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Phone Number</p>
                    <input type="text" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
                <div className="flex max-md:flex-col justify-center  space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Profile Pic</p>
                    <div  className="w-full flex space-y-2 max-[400px]:flex-col justify-between items-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500">
                        <div className="h-[80px] w-[80px] rounded-full mx-auto bg-black"></div>
                        <FileUpload/>
                    </div>
                </div>
                <div className="flex max-md:flex-col justify-center space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Department</p>
                    <input type="text" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
                <div className="flex max-md:flex-col justify-between space-y-1 md:items-center ">
                    <p className="text-xs   md:w-[20%]">Document</p>
                    <div  className="w-full h-10 "><FileUploadComponent/></div> 
                </div>
                <div className="flex max-md:flex-col justify-center space-y-1 md:items-center ">
                    <p className="text-xs  md:w-[20%]">Experience</p>
                    <input type="number" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
                <div className="flex max-md:flex-col justify-between space-y-1 md:items-center ">
                    <p className="text-xs   md:w-[20%]">Description</p>
                    <textarea  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"/>
                </div>
            </div>
            {/* <hr className="inline-block my-3"/> */}
        </div>}/>
        
    </>
  )
}

export default AddLawyer