import InfoAccount from "@/components/account/InfoAccount";
import UserLinks from "@/components/account/UserLinks";
import React from "react";

const Account: React.FC = () => {
  return (
    <main className="flex md:flex-row flex-col w-11/12 mx-auto">
      <UserLinks />
      <InfoAccount />
    </main>
  );
};

export default Account;
