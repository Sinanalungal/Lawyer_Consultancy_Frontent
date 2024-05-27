import React from 'react'
import { FaEdit } from "react-icons/fa";
import Table from '../../../components/table/Table';
import LawyerHome from '../home/LawyerHome';

// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Blocked",
//     value: "blocked",
//   },
//   {
//     label: "Unblocked",
//     value: "unblocked",
//   },
// ];

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


function LawyerSubscriptions() {
  return (
    <LawyerHome ind={2} component={<>
      <Table columns={headers} data={data} itemsPerPage={15} buttonDetail={buttonDetail} />
      </>}/>
  )
}

export default LawyerSubscriptions