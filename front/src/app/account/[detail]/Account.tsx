import InfoAccount from "@/components/account/InfoAccount";
import Reservations from "@/components/account/Reservations";
import UserLinks from "@/components/account/UserLinks";
import React from "react";

const Account: React.FC<{ params: { detail: string } }> = ({ params }) => {
  const { detail } = params;
  
  if (detail !== "user" && detail !== "reservations") {
    return <div>Invalid detail parameter.</div>;
  }

  return (
    <main className="flex md:flex-row flex-col w-11/12 mx-auto">
      <UserLinks />
      {detail === "user" ? <InfoAccount /> : <Reservations />}
    </main>
  );
};

export default Account;
