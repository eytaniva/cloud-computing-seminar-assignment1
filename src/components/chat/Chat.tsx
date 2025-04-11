import router from "@services/router.ts";
import BotMode from "@components/botMode";
import React, { FC, useState } from "react";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ChatHistory from "@components/chatHistory";
import { Layout, UserInput } from "@components/chat/styles.ts";
import { BotModeType } from "@components/botMode/types.ts";
import { QUERY_KEYS } from "@utils/queryKeys.ts";
import { DbResponse } from "@utils/types.ts";

const Chat: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "HEADER" });

  const [userInput, setUserInput] = useState<string>("");
  const [mode, setMode] = useState<BotModeType>("droid");
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [userMessages, setUserMessages] = useState<string[]>([]);

  const { refetch } = useQuery({
    queryKey: [QUERY_KEYS.GEMINI_AI],
    enabled: !!userMessages.length && userMessages.length > aiMessages.length,
    queryFn: async () => {
      const response: string = await router.geminiAi(
        userInput.length ? userInput : userMessages[userMessages.length - 1],
        mode,
      );
      setAiMessages([...aiMessages, response]);
      return response;
    },
  });

  const { isLoading, data: recent } = useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT],
    enabled: !userMessages.length && !userMessages.length,
    queryFn: async () => {
      const response: DbResponse[] = await router.getRecentConversations();
      setUserMessages(response.map((item) => item["user-prompt"]));
      setAiMessages(response.map((item) => item["ai-reply"]));
      return response;
    },
  });

  return (
    <Layout>
      <BotMode mode={mode} setMode={setMode} />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <ChatHistory userMessages={userMessages} aiMessages={aiMessages} />
      )}
      <UserInput
        id="user-input"
        label="Talk to me!"
        variant="outlined"
        value={userInput}
        onKeyDown={({ preventDefault, key }) => {
          if (key === "Enter") {
            setUserMessages([...userMessages, userInput]);
            refetch();
            setUserInput("");
            preventDefault();
          }
        }}
        onChange={({ target }) => {
          setUserInput(target.value);
        }}
        inputProps={{
          style: {
            color: "white",
          },
        }}
      />
    </Layout>
  );
};

export default Chat;
