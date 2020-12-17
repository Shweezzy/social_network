import React from "react";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div>
      <p
        style={{
          color: "red",
          textAlign: "center",
          fontSize: "25px",
          textshadow: "6px 6px 0px rgba(0,0,0,0.2)",
        }}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorMessage;
