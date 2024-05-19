import React from 'react';

const FileUploadComponent: React.FC = ({handleChangeManage}) => {
  return (
    < >
      <div className="w-full  mx-auto">
      
      <div className="relative">
        <input
          id="file_input"
          type="file"
          onChange={handleChangeManage}
          className="hidden"
        />
        <label
          htmlFor="file_input"
          className="block w-full px-4 py-2 text-sm text-center text-white bg-slate-700 rounded-md cursor-pointer hover:bg-slate-800  focus:outline-none  transition duration-300 ease-in-out"
        >
          Choose File
        </label>
      </div>
    </div>   
    </>
  );
};

export default FileUploadComponent;
