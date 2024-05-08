import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface TableColumn {
  key: string;
  label: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[]; // You can specify a more specific type if needed
  itemsPerPage?: number;
  buttonDetail?:TableColumn;
}

const Table: React.FC<TableProps> = ({ columns, data, itemsPerPage = 5 , buttonDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  return (
    <div className="overflow-hidden bg-white shadow-md m-1 rounded-lg">
      <div className="px-6 py-4 shadow-md bg-slate-50">
    
        

        {/* Search input */}
        <div className="mb-4 flex items-end flex-col">
            {buttonDetail && buttonDetail.key!='' && <Link to={`${buttonDetail?.label}`}><button className='px-3 py-2 text-white mb-3 rounded-md  bg-slate-800 text-xs'>{buttonDetail?.key}
            </button></Link>}
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-[50%] px-4 py-2 border border-gray-300 rounded-md focus:outline focus:outline-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto rounded-t-md">
          <table className="w-full table-auto border-collapse border border-gray-300">
            {/* Table headers */}
            <thead className="bg-slate-300">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-4 py-2 text-left text-xs font-semibold text-gray-700">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t text-sm font-semibold border-gray-300">
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
        <div className="bg-slate-300 px-6 py-3 flex justify-between items-center border-t border-gray-300">
          <p className="text-xs font-semibold text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex space-x-4">
            <button className="text-xs font-medium text-blue-800 hover:text-blue-700" onClick={handlePrevPage}>
              Previous
            </button>
            <button className="text-xs font-medium text-blue-800 hover:text-blue-700" onClick={handleNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
