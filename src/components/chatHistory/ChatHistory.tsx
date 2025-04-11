import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  AiBubble,
  PreviousMessages,
  UserBubble,
} from "@components/chatHistory/styles.ts";

const ChatHistory: FC<{ userMessages: string[]; aiMessages: string[] }> = ({
  userMessages,
  aiMessages,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "HEADER" });

  return (
    <PreviousMessages>
      {Array.from({ length: userMessages.length }).map((_, i: number) => {
        return (
          // <>
          //   <Bubble
          //     key={"user" + userMessages[i]}
          //     sx={{
          //       color: "#CC7832",
          //       backgroundColor: "#383A40",
          //       borderColor: "#CC7832",
          //       left: "0",
          //     }}
          //   >
          //     {userMessages[i]}
          //   </Bubble>
          //   <br key={"br1"} />
          //   <br key={"br2"} />
          //   <Bubble
          //     key={"ai" + aiMessages[i]}
          //     sx={{
          //       color: "#9876AA",
          //       backgroundColor: "#282A36",
          //       borderColor: "#9876AA",
          //       right: "0",
          //     }}
          //   >
          //     {(aiMessages[i] ?? "Wait for it") + "..."}
          //   </Bubble>
          //   <br key={"br3"} />
          //   <br key={"br4"} />
          // </>
          <>
            <UserBubble>{userMessages[i]}</UserBubble>
            <AiBubble>{aiMessages[i] ?? "Wait for it..."}</AiBubble>
          </>
        );
      })}
    </PreviousMessages>
  );
};

export default ChatHistory;
