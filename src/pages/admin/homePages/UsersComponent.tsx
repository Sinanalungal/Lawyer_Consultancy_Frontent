import React, { useEffect } from 'react';
import Table from '../../../components/table/Table';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AccessTokenManager from '../../../redux/slice/interceptor';
// import AccessTokenManager from '../../../redux/slice/interceptor'; // Assuming the file is in the same directory


const buttonDetail = { key: '', label: '' };

const headers = [
  { key: 'image', label: 'Image' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Username/Email' },
  { key: 'edit', label: 'Edit' },
  { key: 'status', label: 'Block/Unblock' },
];

function UsersComponent() {
  const { user } = useSelector((state: any) => state.login);
  
  const [users, setUsers] = React.useState<any>([]);


  const getAxiosInstance = async() =>{
    const accessTokenManager = new AccessTokenManager(`${BASE_URL}`, user);
    const axiosInstance = await accessTokenManager.createAxiosInstance();
    return axiosInstance;
  }

  
  useEffect(() => {
    async function fetchData(role: string) {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}adminside/user-data/?role=${role}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors here
      }
    }
    fetchData('user');
  }, []);

  const manageUser = async (id: number) => {
    try {
      const response = await axios.patch(`${BASE_URL}adminside/user-data/`,{id:id,role:'user'},{
        headers: {
          Authorization: `Bearer ${user.access}`,
        }});
      console.log('User updated:', response.data);
      setUsers(response.data);
      // Update the users state or perform other actions if needed
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle errors here
    }
  };

  var data = users.map((user_data: any) => ({
    name: user_data.full_name,
    phone: user_data.phone_number,
    email: user_data.email,
    status: user_data.is_verified ? (
      <div className='px-2 py-1 text-xs bg-red-300 text-black cursor-pointer inline-block rounded-md' onClick={() => manageUser(user_data.id)}>Block</div>
    ) : (
      <div className='px-2 py-1 text-xs bg-green-300 text-black cursor-pointer inline-block rounded-md' onClick={() => manageUser(user_data.id)}>Unblock</div>
    ),
    edit: <FaUserEdit size={20} />,
  }));
  

  return (
    <>
      <div className='w-full flex justify-center max-sm:text-2xl text-4xl font-bold p-12 h-auto'>Users List</div>
      <Table columns={headers} data={data} itemsPerPage={15} buttonDetail={buttonDetail} />
    </>
  );
}

export default UsersComponent;
