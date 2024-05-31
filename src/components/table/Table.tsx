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
  search: string; 
  setSearch: React.Dispatch<React.SetStateAction<string>>; 
  nextButton: () => void; 
  previousButton: () => void;
  pageNum: Number; 
  total:Number;
}

const Table: React.FC<TableProps> = ({ columns, data, total, previousButton , nextButton ,pageNum , buttonDetail ,search , setSearch }) => {
  
  return (
    <div className="overflow-hidden bg-white shadow-md m-1 rounded-lg">
      <div className="px-6 py-4 shadow-md">
        <div className="mb-4 flex  bg-gray-100 p-3 rounded-md items-end flex-col ">
            {buttonDetail && buttonDetail.key!='' && <Link to={`${buttonDetail?.label}`}><button className='px-3 py-2 text-white mb-3 rounded-md  bg-slate-800 text-xs'>{buttonDetail?.key}
            </button></Link>}
          <div className='flex max-[400px]:flex-col max-[400px]:items-end justify-end w-full'>
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-[50%] text-xs px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className='flex ml-1'>
             
            </div>
          </div>
        </div>
        <div className="overflow-x-auto  rounded-t-md">
          <table className="w-full  table-auto border-opacity-40  border  border-gray-300">
            <thead className="bg-gray-200"> {/* Color for heading */}
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4  py-3 text-left text-sm font-bold w-[200px] truncate text-gray-700">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border border-opacity-40 text-xs font-semibold border-gray-300`}>
                  {/* Alternating row colors */}
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
