import React, { FC } from "react";
import company from "@assets/company.jpg";
import { Typography } from "@mui/material";
import meProfessional from "@assets/me.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HeartImage, Layout } from "@pages/match/styles.ts";

const Match: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "MATCH_PAGE" });

  return (
    <Layout onClick={() => navigate("/")}>
      <Typography variant={"h1"}>{t("MATCH")}</Typography>
      <HeartImage src={meProfessional} alt={"me"} />
      <HeartImage src={company} alt={"company"} />
    </Layout>
  );
};

export default Match;
