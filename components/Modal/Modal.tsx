import { FC, ReactElement, HTMLAttributes } from 'react';

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactElement | string;
  onAccept?: () => void;
  onCancel?: () => void;
  status: boolean;
}

const Modal: FC<IModalProps> = ({ children, status, onAccept, onCancel }) => {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={status} />
      <div className="modal">
        <div className="modal-box">
          {children}
          <div className="modal-action">
            <label className="btn btn-primary" onClick={onAccept}>
              Accept
            </label>
            <label className="btn" onClick={onCancel}>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
