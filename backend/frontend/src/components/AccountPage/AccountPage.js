import React from "react";
import AccountDetails from "./AccountDetails";

const AccountPage = ({ name, lastName, userName, email }) => {
  return (
    <div>
      <AccountDetails dataName="Name:" dataToShow={name} />

      <AccountDetails dataName="Last name:" dataToShow={lastName} />

      <AccountDetails dataName="User name:" dataToShow={userName} />

      <AccountDetails dataName="E-mail:" dataToShow={email} />
    </div>
  );
};

export default AccountPage;
