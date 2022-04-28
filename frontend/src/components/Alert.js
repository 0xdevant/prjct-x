import React from "react";

function Alert({ type, message, dismiss }) {
  return (
    <div className="fixed top-1/4 left-2/4 -translate-x-2/4 alert-container max-w-md">
      <div
        className={`${
          type === "success" ? "bg-green-200" : "bg-red-200"
        } rounded-md p-6 text-black flex justify-center items-center`}
      >
        <button
          type="button"
          className="absolute right-0 top-0 px-2"
          aria-label="Close"
          onClick={dismiss}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        {message}
      </div>
    </div>
  );
}

export default Alert;
