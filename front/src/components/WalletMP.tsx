import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import React, { useEffect } from "react";

const WalletMP: React.FC<{ preferenceId: string | null }> = ({
  preferenceId,
}) => {
  useEffect(() => {
    initMercadoPago("TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc", {
      locale: "es-AR",
    });
  }, [preferenceId]);
  
  return (
    <div>{preferenceId && <Wallet initialization={{ preferenceId }} />}</div>
  );
};

export default WalletMP;
