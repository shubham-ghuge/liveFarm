import React from "react";
import { useEffect } from "react";
import { AiFillCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

function Alert({ onClose, message, color = "danger" }) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, []);
  return (
    <div className="alert d-flex jc-center">
      <div className={`alert-${color} w-sm-30 outline-${color}`}>
        <span className="icon">
          <AiOutlineInfoCircle />
        </span>
        <div className="alert-content">
          <p> {message}</p>
        </div>
        <span className="close">
          <button
            onClick={() => onClose()}
            className={`btn-reset icon w-auto c-${color}`}
          >
            <AiFillCloseCircle />
          </button>
        </span>
      </div>
    </div>
  );
}
export { Alert };
