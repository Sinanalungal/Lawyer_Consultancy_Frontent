import { DiVim } from 'react-icons/di';
import Table from '../../../components/table/Table';
import AdminHome from '../home/AdminHome';

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

function NotificationComponent() {
  return (
    <>
    <AdminHome ind={5} component={<div>
      <div className='w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto'>Notifications</div>
    <Table columns={headers} data={data} itemsPerPage={15} buttonDetail={buttonDetail} />
    </div>}/>
    </>
  )
}

export default NotificationComponent