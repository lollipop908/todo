import React from "react";
import "../styles/ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p>Are you sure you want to delete the selected item(s)?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-confirm">
            Yes
          </button>
          <button onClick={onCancel} className="modal-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
