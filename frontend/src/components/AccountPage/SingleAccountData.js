import React from "react";

const SingleAccountData = ({ dataName, dataToShow }) => {
  return (
    <div style={{ fontSize: "19px" }}>
      <p />
      <span>
        {dataName} {dataToShow}
      </span>
      <p />
    </div>
  );
};

export default SingleAccountData;
