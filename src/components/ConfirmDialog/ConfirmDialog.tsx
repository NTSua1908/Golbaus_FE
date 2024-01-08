import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import "./confirmDialog.scss";

interface ConfirmDialogProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  show: boolean;
}

function ConfirmDialog({
  title,
  message,
  onCancel,
  onConfirm,
  show,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onCancel();
    onConfirm();
  };

  return (
    <div className={`confirmDialog ${show && "show"}`}>
      <div className='confirmDialog-background' onClick={onCancel}></div>
      <div className='confirmDialog-container'>
        <div className='confirmDialog-content'>
          <div className='confirmDialog-content-icon'>
            <FaQuestionCircle />
          </div>
          <div className='confirmDialog-content-message'>
            <h2 className='confirmDialog-content-message-title'>{title}</h2>
            <div className='confirmDialog-content-message-description'>
              {message}
            </div>
          </div>
        </div>
        <div className='confirmDialog-function'>
          <div
            className='confirmDialog-function-button cancel'
            onClick={onCancel}
          >
            Cancel
          </div>
          <div
            className='confirmDialog-function-button confirm'
            onClick={handleConfirm}
          >
            Okey
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
