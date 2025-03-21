import s from "./NotificationModal.module.css";

type NotificationModalProps = {
  message: string;
  onClose: () => void;
  isError?: boolean;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  message,
  onClose,
  isError = false,
}) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2 className={isError ? s.errorTitle : s.successTitle}>
          {isError ? "Error" : "Success"}
        </h2>
        <p>{message}</p>
        <button onClick={onClose} className={s.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
