import me from "@assets/me.svg";
import React, { FC } from "react";
import {
  Layout,
  StyledAppBar,
  AppBarImage,
} from "@components/header/styles.ts";
import company from "@assets/company.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconButton, Toolbar, Typography } from "@mui/material";

const Header: FC<{ assNumber: string }> = ({ assNumber }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "HEADER" });

  return (
    <Layout>
      <StyledAppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={() => navigate("/match")}
          >
            <AppBarImage src={me} alt={"me"} />
          </IconButton>
          <Typography variant="h6" flexGrow={1} style={{margin: "auto 0"}}>
            {`${t("TITLE")} ${assNumber}`}
          </Typography>
          <AppBarImage src={company} alt={"company"} />
        </Toolbar>
      </StyledAppBar>
    </Layout>
  );
};

export default Header;
