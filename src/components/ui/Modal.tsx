type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const ModalItem = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {" "}
      {/* 모달 배경 */}
      <div className="modal-content">
        {" "}
        {/* 모달 내용 */}
        <header>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
          <button onClick={onClose}>닫기</button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default ModalItem;
