"use client";
import Script from "next/script";
import React from "react";

const Chat = () => {
  return (
    <Script
      src="https://cdn.voiceflow.com/widget/bundle.mjs"
      type="text/javascript"
      strategy="lazyOnload"
      onLoad={() => {
        window.voiceflow.chat.load({
          verify: { projectID: "66c0c50b64ddc55ee73d0c4e" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
        });
      }}
    />
  );
};

export default Chat;
