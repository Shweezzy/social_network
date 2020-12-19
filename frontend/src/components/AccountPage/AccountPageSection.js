import React from "react";
import SingleAccountData from "./SingleAccountData";

const AccountPageSection = ({ name, lastName, userName, email }) => {
  return (
    <div>
      <SingleAccountData dataName="Name:" dataToShow={name} />

      <SingleAccountData dataName="Last name:" dataToShow={lastName} />

      <SingleAccountData dataName="User name:" dataToShow={userName} />

      <SingleAccountData dataName="E-mail:" dataToShow={email} />
    </div>
  );
};

export default AccountPageSection;
