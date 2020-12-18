import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      <p
        style={{
          color: "black",
          textAlign: "center",
          fontSize: "25px",
        }}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorMessage;
