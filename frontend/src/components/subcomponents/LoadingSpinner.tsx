import React from "react";

function LoadingSpinner() {
  return (
    <div className="centered">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loadinx...</span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
