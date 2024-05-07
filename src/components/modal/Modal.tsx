interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className="w-full min-h-screen  z-50 fixed flex justify-center items-center  bg-black">
      <div className="modal absolute z-50 sm:w-[50%] w-[98%]">
        <div className="modal-content">
          {/* <span className="close" onClick={onClose}>&times;</span> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
