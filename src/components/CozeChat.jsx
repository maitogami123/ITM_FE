// src/components/CozeChat.js
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const CozeChat = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js";
    script.async = true;
    script.onload = () => {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: "7439347335895171090",
        },
        componentProps: {
          title: "ITM Assistant",
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <script src="https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js"></script>
      </Helmet>
      <div id="coze-web-chat"></div>
    </div>
  );
};

export default CozeChat;
