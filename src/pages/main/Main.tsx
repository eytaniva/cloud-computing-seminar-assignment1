import React, { FC } from "react";
import Chat from "@components/chat";
import Header from "@components/header";
import BotMode from "@components/botMode";
import { Layout } from "@pages/main/styles.ts";
import { useTranslation } from "react-i18next";

const Main: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "MAIN_PAGE" });

  return (
    <Layout>
      <Header assNumber={"Assignment 1"} />
      <Chat />
    </Layout>
  );
};

export default Main;
