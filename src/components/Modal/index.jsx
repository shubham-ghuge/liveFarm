import React from "react";

function Modal({ heading, message, onClose, confirmAction }) {
  return (
    <div
      className={`modal-container ${heading && "show"}`}
      style={{ zIndex: "var(--z-4" }}
    >
      <div className={`modal dialog ${heading && "show"}`}>
        <h5 className={`dialog-heading c-danger`}>{heading}</h5>
        <p className="dialog-details">{message}</p>
        <div className="dialog-btns jc-end">
          <button
            className="btn-primary"
            onClick={() => {
              confirmAction();
              return onClose();
            }}
          >
            Accept
          </button>
          <button className="btn-c-danger" onClick={() => onClose()}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
export { Modal };
