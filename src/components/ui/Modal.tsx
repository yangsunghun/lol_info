import { X } from "lucide-react";
import Button from "./Button";

type Props = {
  isOpen: boolean;

  children: React.ReactNode;
  onClose: () => void;
};

const ModalItem = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay text-black" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          <X />
        </button>
        <div className="modal-body">{children}</div>
        <Button
          className="mt-3 float-end"
          size="default"
          color="black"
          fill={true}
          handleClick={onClose}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default ModalItem;
