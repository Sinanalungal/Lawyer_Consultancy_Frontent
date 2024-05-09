import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../redux/slice/LoginActions';

interface DropdownProps {
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose(); // Close the dropdown after logout
  };

  return (
    <div className="absolute right-0 mt-[115px] w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <div className="py-1">
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          <FiLogOut className="inline-block mr-2" size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
