import React from "react";

const AccountDetails = ({ dataName, dataToShow }) => {
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

export default AccountDetails;
