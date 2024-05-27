import React, { useState } from 'react';
import { GoFilter } from "react-icons/go";
import { Link } from 'react-router-dom';
import { GrFormNextLink ,GrFormPreviousLink} from "react-icons/gr";


interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[]; 
  itemsPerPage?: Number;
  buttonDetail?: TableColumn;
  search: string; // Type for the search term
  setSearch: React.Dispatch<React.SetStateAction<string>>; // Type for the setSearch function
  nextButton: () => void; // Function for handling next button click
  previousButton: () => void; // Function for handling previous button click
  pageNum: Number; // Current page number
  total:Number;
}

const Table: React.FC<TableProps> = ({ columns, data, total, previousButton , nextButton ,pageNum , buttonDetail ,search , setSearch }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  // const filteredData = data.filter((item) =>
  //   Object.values(item).some((value) =>
  //     String(value).toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  // Pagination
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = filteredData.slice(startIndex, endIndex);

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };

  return (
    <div className="overflow-hidden bg-white shadow-md m-1 rounded-lg">
      <div className="px-6 py-4 shadow-md">
        <div className="mb-4 flex  bg-gray-300 p-3 rounded-md items-end flex-col ">
            {buttonDetail && buttonDetail.key!='' && <Link to={`${buttonDetail?.label}`}><button className='px-3 py-2 text-white mb-3 rounded-md  bg-slate-800 text-xs'>{buttonDetail?.key}
            </button></Link>}
          <div className='flex max-[400px]:flex-col max-[400px]:items-end justify-between w-full'>
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-[50%] text-xs px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='flex ml-1'>
              <button
                type="button"
                className="flex bg-white max-[400px]:mt-1 items-center mr-1  text-xs px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
                
              ><GoFilter className='mr-1'/>
              Filters</button>
              {/* <input
                type="text"
                placeholder="Search..."
                className=" text-xs px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /> */}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto  rounded-t-md">
          <table className="w-full  table-auto border-opacity-40  border  border-gray-300">
            {/* Table headers */}
            <thead className="bg-white ">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4  py-3 text-left text-sm font-bold w-[200px] truncate text-gray-700">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border border-opacity-40 text-xs font-semibold border-gray-300">
                  {/* Table cells */}
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-2">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="border border-opacity-40 rounded-b-md px-6 py-3 flex max-sm:justify-end justify-between items-center border-t border-gray-300">
          <p className="text-[12px] max-sm:hidden p-2 bg-gray-300 border rounded-lg font-semibold text-black">
            Page {pageNum} of {total}
          </p>
          <div className="flex space-x-2">
            <button className="text-xs font-sm border p-2 rounded-lg text-black" onClick={previousButton}>
            <GrFormPreviousLink size={15}/>
            </button>
            <div className="text-xs bg-gray-300 font-medium py-2 px-3 text-black rounded-md" >
            {pageNum} 
            </div>
            <button className="text-xs font-sm border p-2 rounded-lg text-black" onClick={nextButton}>
              <GrFormNextLink size={15}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
