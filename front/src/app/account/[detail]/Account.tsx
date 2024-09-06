import InfoAccount from "@/components/account/InfoAccount";
import Opinions from "@/components/account/Opinions";
import Reservations from "@/components/account/Reservations";
import Services from "@/components/account/Services";
import UserLinks from "@/components/account/UserLinks";
import React from "react";

const Account: React.FC<{ params: { detail: string } }> = ({ params }) => {
  const { detail } = params;

  if (detail !== "user" && detail !== "reservations" && detail !== "opinions" && 
    detail !== "services") {
    return <div>Invalid detail parameter.</div>;
  }

  return (
    <main className="flex md:flex-row flex-col w-11/12 mx-auto">
      <UserLinks />
      {detail === "user" && <InfoAccount />}
      {detail === "reservations" && <Reservations />}
      {detail === "opinions" && <Opinions />}
      {detail === "services" && <Services/>}
    </main>
  );
};

export default Account;
