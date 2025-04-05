import BotMode from "@components/botMode";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ChatHistory from "@components/chatHistory";
import { Layout, UserInput } from "@components/chat/styles.ts";
import { BotModeType } from "@components/botMode/types.ts";
import { LinearProgress } from "@mui/material";

const Chat: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "HEADER" });

  const [userInput, setUserInput] = useState<string>("");
  const [mode, setMode] = useState<BotModeType>("droid");
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [userMessages, setUserMessages] = useState<string[]>([]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["OPEN_AI"],
    enabled: !!userMessages.length,
    queryFn: async () => {
      // const response: string = await router.openAI(userInput, mode);

      const response = "I am Groot";
      setAiMessages([...aiMessages, response]);
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
