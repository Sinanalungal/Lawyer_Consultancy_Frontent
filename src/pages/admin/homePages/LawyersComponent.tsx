import React from 'react'
import { FaEdit } from "react-icons/fa";
import Table from '../../../components/table/Table';

const buttonDetail={ key: '', label: '' } 

const headers = [
  { key: 'image', label: 'Image' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Username/Email' },
  { key: 'status', label: 'Online/Offline' },
  { key: 'department', label: 'Department' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'blocked', label: 'Status' },
];

const data = [
  {
    image:<img className='w-12 h-12 rounded-md bg-cover' src= './justice.jpg'></img>,
    name: 'John Michael',
    phone:'92038845545',
    email: 'john@example.com',
    status: <div className='px-2 py-1 text-xs bg-green-300 text-black inline-block rounded-md'>blocked</div>,
    department: 'Family',
    certificates: 'Bachelor of Law',
    blocked: <div className='px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md'>blocked</div>,
  }, {
    name: 'John Michael',
    email: 'john@example.com',
    status: <div className='px-2 py-1 text-xs bg-green-300 text-black inline-block rounded-md'>blocked</div>,
    department: 'Family',
    certificates: 'Bachelor of Law',
    blocked: <div className='px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md'>blocked</div>,
  },
  {
    name: 'John Michael',
    email: 'john@example.com',
    status: <div className='px-2 py-1 text-xs bg-green-300 text-black inline-block rounded-md'>blocked</div>,
    department: 'Family',
    certificates: 'Bachelor of Law',
    blocked: <div className='px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md'>blocked</div>,
  }, {
    name: 'John Michael',
    email: 'john@example.com',
    status: <div className='px-2 py-1 text-xs bg-green-300 text-black inline-block rounded-md'>blocked</div>,
    department: 'Family',
    certificates: 'Bachelor of Law',
    blocked: <div className='px-2 py-1 text-xs bg-red-300 text-black inline-block rounded-md'>blocked</div>,
  },
  
];

function LawyersComponent() {
  return (
    <>
    <div className='w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto'>Lawyers List</div>
    <Table columns={headers} data={data} itemsPerPage={15} buttonDetail={buttonDetail} />
    {/* <div className="overflow-hidden bg-white shadow-md m-1 rounded-lg">
      <div className="px-6 py-4 shadow-md bg-slate-50">
        <div className="flex max-sm:flex-col justify-end items-center mb-4">
          <div className="flex space-x-4 ">
            
            <button className="flex items-center bg-slate-800 text-xs font-bold max-sm:mt-3 hover:bg-slate-700 text-white px-3 py-2 rounded-md">
              Add lawyer
            </button>
          </div>
        </div>
        <div className="flex max-sm:flex-col justify-end items-center mb-4">
          <div className="w-full text-xs md:w-[50%]">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
            />
          </div>
         
        </div>
        <div className="overflow-x-auto rounded-t-md">
          <table className="w-full table-auto border-collapse border border-gray-300 ">
            <thead className="bg-slate-300">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="px-4 py-2 text-left text-xs font-semibold text-gray-700">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ img, name, email, status, department, certificates,phonenumber,blocked }) => (
                <tr key={name} className="border-t text-sm font-semibold border-gray-300">
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <img src={img} alt={name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{name}</p>
                        <p className="text-xs text-gray-600">{phonenumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-xs font-semibold text-gray-800">{email}</p>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded ${status ? 'bg-green-500 text-white' : 'bg-blue-gray-200 text-gray-700'}`}>
                      {status ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="">
                      <FaEdit  size={21}/>
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-xs font-semibold text-gray-800">{department}</p>
                  </td>
                  <td className="px-4 py-2">
                    <p className="text-xs font-semibold text-gray-800">{certificates}</p>
                  </td>
                  <td className="px-4 py-2">
                    <button className={`px-2 py-1 text-xs rounded ${blocked ? 'bg-green-500 text-white' : 'bg-red-800 text-white'}`}>
                      {blocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-slate-300 px-6 py-4 flex justify-between items-center border-t border-gray-300">
        <p className="text-xs font-semibold text-gray-600">Page 1 of 10</p>
        <div className="flex space-x-4">
          <button className="text-xs font-medium text-blue-800 hover:text-blue-700">Previous</button>
          <button className="text-xs font-medium text-blue-800 hover:text-blue-700">Next</button>
        </div>
      </div>
    </div> */}
    </>
  )
}

export default LawyersComponent