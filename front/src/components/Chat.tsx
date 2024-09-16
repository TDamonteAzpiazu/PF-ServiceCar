"use client";
import Script from "next/script";
import React from "react";

const Chat = () => {
  return (
    <Script
      id="voiceflow-chat"
      type="text/javascript"
      src="https://cdn.voiceflow.com/widget/bundle.mjs"
      strategy="lazyOnload"
      onLoad={() => {
        window.voiceflow.chat.load({
          verify: { projectID: "66e44b5303dc1207729d6f0b" },  // Nuevo Project ID
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",  // Nuevo Version ID
        });
      }}
    />
  );
};

export default Chat;
