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
