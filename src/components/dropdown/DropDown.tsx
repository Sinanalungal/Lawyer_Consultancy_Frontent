import { useDispatch } from 'react-redux';




const Dropdown: React.FC<any> = ({component}) => {
  

  return (
    <div className="absolute right-0 mt-[115px] w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <div className="py-1">
        {component}
      </div>
    </div>
  );
};

export default Dropdown;
