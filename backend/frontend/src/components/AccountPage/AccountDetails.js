import React from "react";

const AccountDetails = ({ dataName, dataToShow }) => {
  return (
    <div>
      <p />
      <span>
        {dataName} {dataToShow}
      </span>
      <p />
    </div>
  );
};

export default AccountDetails;
