import React, { FC } from "react";
import Header from "@components/header";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Main: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "MAIN_PAGE" });

  return (
    <>
      <Header companyName={"Within Temptation"} />
      <Typography variant={"h1"}>{t("HELLO_WORLD")}</Typography>
    </>
  );
};

export default Main;
